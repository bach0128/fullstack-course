const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const name = request.query.name

    let blogs

    if (name) {
      blogs = await Blog.find({
        name: {
          $regex: name,
          $options: 'i',
        },
      })
    } else {
      blogs = await Blog.find({})
    }

    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
