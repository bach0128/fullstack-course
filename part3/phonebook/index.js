require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
// const cors = require("cors");
// const Note = require("./src/models/note");

const app = express()
// app.use(cors());

morgan.token('type', function (req) {
  return req.headers['content-type']
})

//middleware
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Fullstack course</h1>')
})

const personsRouter = require('./src/controllers/persons.js')

app.use('/api/persons', personsRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
