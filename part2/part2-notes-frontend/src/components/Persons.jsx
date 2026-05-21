import React from "react";

function Person({ persons, filter }) {
  return (
    <div>
      {(filter === ""
        ? persons
        : persons.filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()),
          )
      ).map((person) => (
        <p key={person.id}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
}

export default Person;
