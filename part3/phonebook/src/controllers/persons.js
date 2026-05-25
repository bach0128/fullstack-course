const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongoose");
const Person = require("../models/person");

const generateId = () => {
  return new ObjectId().toString();
};

//info
router.get("/info", async (request, response) => {
  const persons = await Person.find({});
  response.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`);
});

// GET all persons
router.get("/", async (request, response, next) => {
  try {
    const name = request.query.name;

    let persons;

    if (name) {
      persons = await Person.find({
        name: {
          $regex: name,
          $options: "i",
        },
      });
    } else {
      persons = await Person.find({});
    }

    response.json(persons);
  } catch (error) {
    next(error);
  }
});

// GET person by id
router.get("/:id", (request, response) => {
  const id = request.params.id;

  Person.findById(id).then((person) => {
    response.json(person);
  });
});

// DELETE person
router.delete("/:id", (request, response) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id).then((person) => response.json(person));
});

// CREATE person
router.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: "name or number missing",
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    console.log(person);

    const savedPerson = await person.save();

    response.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
