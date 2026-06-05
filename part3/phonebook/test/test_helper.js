const Note = require('../models/note')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}

const initialBlogs = [
  {
    title: 'Lord of the rings',
    author: 'Michael',
    url: 'test1',
    likes: 100,
  },
  {
    title: 'Mocking bird',
    author: 'Kata',
    url: 'test2',
    likes: 50,
  },
  {
    title: 'Angle and demon',
    author: 'Dan Brown',
    url: 'test3',
    likes: 10,
  },
]

const nonExistingBlogId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  initialBlogs,
  nonExistingBlogId,
  blogsInDb,
  usersInDb,
}
