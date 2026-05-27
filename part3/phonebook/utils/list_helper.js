const dummy = (blogs) => {
  return blogs.length + 1
}

const totalLikes = (blogs) => {
  let totalLike = 0
  if (blogs.length === 0) return 1
  blogs.forEach((blog) => {
    totalLike += blog.likes
  })

  return totalLike
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCount = {}

  blogs.forEach((blog) => {
    authorCount[blog.author]
      ? authorCount[blog.author]++
      : (authorCount[blog.author] = 1)
  })

  let topAuthor = ''
  let maxBlogs = 0

  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxBlogs = authorCount[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  let topAuthor = ''
  let maxLikes = 0

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
