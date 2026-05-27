import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL || "";

const getPersons = async (name = "") => {
  const response = await axios.get("/api/persons", {
    params: {
      name,
    },
  });

  return response.data;
};

// const getPersonById = async (id = "") => {
//   const response = await axios.get(`/api/persons/${id}`);

//   return response.data;
// };

const addPerson = async (data) => {
  const response = await axios.post("/api/persons", data);

  return response.data;
};

export { getPersons, addPerson };
