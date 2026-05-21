import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filter, setFilter] = useState("");
  const handleAddPerson = (newName, newNumber) => {
    if (newName !== "") {
      const nameExists = persons.some((person) => person.name === newName);
      if (nameExists) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
  };
  return (
    <div>
      <div>
        <h2>Phonebooks</h2>
        <p>Filter shown with</p>
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <div>
        <h3>Add a new</h3>
        <PersonForm handleAddPerson={handleAddPerson} />
      </div>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
