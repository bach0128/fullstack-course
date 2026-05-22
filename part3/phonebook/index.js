const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("type", function (req, res) {
  return req.headers["content-type"];
});

//middleware
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

const generateId = () => {
  // const maxId =
  //   notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  // return String(maxId + 1);
  return String(Math.random(100000000000000));
};

// persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const personIndex = persons.findIndex((person) => person.id === id);
  if (personIndex) {
    persons = persons.splice(personIndex, 1);
    response.json("Delete person successfully!");
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const content = request.body.content;
  if (!content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  //validate
  if (!content.name || !content.number) {
    return response.status(400).json({
      error: "missing name or number",
    });
  }

  const isExistPerson = persons.some((person) => person.name === content.name);
  if (isExistPerson) {
    return response.status(400).json({
      error: "user aleady exist",
    });
  }
  const person = {
    id: generateId(),
    ...body.content,
  };
  persons = persons.concat(person);
  response.json(person);
});

//info
app.get("/info", (request, response) => {
  response.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
