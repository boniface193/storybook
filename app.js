const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const connectDB = require('./config/db')
const { formatDate, stripTags, truncate, editIcon, select } = require('./helper/hbs')

// load config
dotenv.config({ path: "./config/config.env" })

// passport config
require('./config/passport')(passport)

// connect Database
connectDB()

const app = express()
// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

// handle bars
app.engine('.hbs', exphbs({ helpers: { formatDate, stripTags, truncate, editIcon, select }, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))
// session middle ware
app.use(session({
    secret: 'storybook',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.CONNECT_DB })
}))

// passport middle ware
app.use(passport.initialize())
app.use(passport.session())

// set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./router/index'))
app.use('/auth', require('./router/auth'))
app.use('/', require('./router/stories'))

const PORT = process.env.PORT || 3000

// check Environment
app.listen(PORT, console.log(`Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`))

