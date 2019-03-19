const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append log to server.log')
    }
  })
  next()
})
app.use((req, res, next) => {
  res.render('maintenance')
})
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})
app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home page',
    wellcomeMessage: 'Welcome to my Website',
    // currentYear: new Date().getFullYear()
  })
  // res.send('<h1>Hello express!!</h1>')
  // res.send({
  //   name: 'Alberto',
  //   likes: [
  //     'bikes',
  //     'computers'
  //   ]
  // })
})
app.get('/about', (req, res) => {
  // res.send('About page!!')
  res.render('about', {
    pageTitle: 'About page',
    // currentYear: new Date().getFullYear()
  })
})
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle the request'
  })
})
app.listen(port, () => {
  console.log(`Server is up and listen on port ${port}`)
})
