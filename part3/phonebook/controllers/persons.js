const express = require('express')
const personsRouter = express.Router()
const Person = require('../models/person')

//info
personsRouter.get('/info', async (request, response) => {
  const persons = await Person.find({})
  response.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`)
})

// GET all persons
personsRouter.get('/', async (request, response, next) => {
  try {
    const name = request.query.name

    let persons

    if (name) {
      persons = await Person.find({
        name: {
          $regex: name,
          $options: 'i',
        },
      })
    } else {
      persons = await Person.find({})
    }

    response.json(persons)
  } catch (error) {
    next(error)
  }
})

// GET person by id
personsRouter.get('/:id', (request, response) => {
  const id = request.params.id

  Person.findById(id).then((person) => {
    response.json(person)
  })
})

// DELETE person
personsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Person.findByIdAndDelete(id).then((person) => response.json(person))
})

// CREATE person
personsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'name or number missing',
      })
    }

    const existPerson = await Person.findOne({ name: body.name })

    if (existPerson) {
      const updatedPerson = await Person.findByIdAndUpdate(
        existPerson._id,
        {
          $set: {
            number: body.number,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      )
      return response.json(updatedPerson)
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    const savedPerson = await person.save()

    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

module.exports = personsRouter
