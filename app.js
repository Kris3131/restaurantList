const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbrs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbrs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(
	session({
		secret: 'MyRestaurantSecret',
		resave: false,
		saveUninitialized: true,
	})
)

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)

app.use((req, res, next) => {
	console.log(req.user)
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	next()
})

app.use(routes)

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
