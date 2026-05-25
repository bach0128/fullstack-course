import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import { addPerson, getPersons } from "./api/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");

  // debounce filter
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500);

    return () => clearTimeout(timeout);
  }, [filter]);

  const handleGetPersons = () =>
    getPersons(debouncedFilter)
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(() => {
    handleGetPersons();
  }, [debouncedFilter]);

  const handleAddPerson = async (newName, newNumber) => {
    if (newName && newNumber) {
      addPerson({ name: newName.trim(), number: newNumber })
        .then(() => handleGetPersons())
        .catch((error) => {
          console.error();
        });
    }
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

      <Persons persons={persons} />
    </div>
  );
};

export default App;
