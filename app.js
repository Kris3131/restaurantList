const express = require('express')
const exphbrs = require('express-handlebars')
const Restaurant = require('./models/Restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbrs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
