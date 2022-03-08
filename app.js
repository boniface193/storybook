const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const passport = require('passport')

const connectDB = require('./config/db')
const app = express()
const PORT = process.env.PORT || 3000

dotenv.config({ path: "./config/config.env" })
require('./config/passport') (passport)

// connect Database
connectDB()

if (process.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// handle bars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')
app.use('/', require('./router/index'))
app.use('/auth', require('./router/auth'))

// session middle ware
app.use(session({
    secret: 'storybook',
    resave: false,
    saveUninitialized: false
}))

// passport middle ware
app.use(passport.initialize())
app.use(passport.session())

// check Environment
app.listen(PORT, console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`))

