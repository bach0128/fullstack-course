import React from "react";
import { useState } from "react";

function PersonForm({ handleAddPerson }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddPerson(newName, newNumber);
        setNewName("");
        setNewNumber("");
      }}
    >
      <div>
        <div>
          name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          number:{" "}
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
