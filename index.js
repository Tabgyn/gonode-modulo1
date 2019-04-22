const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const checkMiddleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }

  return next()
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('form')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  req.query.age = age
  if (age >= 18) {
    return res.redirect(`/major/?age=${age}`)
  } else {
    return res.redirect(`/minor/?age=${age}`)
  }
})

app.get('/major', checkMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.get('/minor', checkMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.listen(3000)
