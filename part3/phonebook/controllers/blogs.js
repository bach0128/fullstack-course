const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

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
      }).populate('user')
    } else {
      blogs = await Blog.find({}).populate('user', 'username name id')
    }

    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  if (!body.url || !body.title) {
    response.status(400).statusMessage('Missing data')
  }

  const blog = new Blog({
    ...body,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).end()
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(403).json({
        error: 'only creator can delete blog',
      })
    }

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  },
)

module.exports = blogsRouter
