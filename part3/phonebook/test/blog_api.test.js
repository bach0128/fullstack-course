const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json and correct amount of blog', async () => {
  const blogList = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(blogList.body.length, helper.initialBlogs.length)
})

test('all blogs have id property', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('create new blog and validate new blog in list', async () => {
  const response = await api.get('/api/blogs')
  const lengthBeforeAdd = response.body.length

  const newBlog = {
    title: 'Angle and demon 2',
    author: 'Dan Brown',
    url: 'test4',
    likes: 20,
  }

  const createdBlog = await api.post('/api/blogs').send(newBlog)

  const response2 = await api.get('/api/blogs')
  const newAddBlog = await response2.body[response2.body.length - 1]

  assert.strictEqual(response2._body.length, lengthBeforeAdd + 1)
  assert.deepStrictEqual(newBlog, {
    title: newAddBlog.title,
    author: newAddBlog.author,
    url: newAddBlog.url,
    likes: newAddBlog.likes,
  })
  assert.strictEqual(typeof createdBlog.body.id, 'string')
})

test('verify auto set likes === 0 if request.likes == undefined', async () => {
  const newBlog = {
    title: 'Angle and demon 2',
    author: 'Dan Brown',
    url: 'test4',
  }

  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

test.only('Missing field when create', async () => {
  const newBlog = {
    title: 'Angle and demon 2',
    author: 'Dan Brown',
    // url: 'test4',
  }

  const respone = await api.post('/api/blogs').send(newBlog)

  assert.equal(respone.status, 400)
})

test('creation fails with status 401 if token is not provided', async () => {
  const newBlog = {
    title: 'Unauthorized blog',
    author: 'Dan Brown',
    url: 'test-url',
    likes: 10,
    userId: '6a1e894699c20fbed9a6c194',
  }

  await api.post('/api/blogs').send(newBlog).expect(401)
})

after(async () => {
  await mongoose.connection.close()
})
