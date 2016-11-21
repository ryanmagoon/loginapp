const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expresshbs = require('express-handlebars')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongo = require('mongodb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/loginapp')
const db = mongoose.connection

const routes = require('./routes/index')
const users = require('./routes/users')

// Initialize App
const app = express()

// Set up View Engine
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', expresshbs({ defaultLayout: 'layout' }))
app.set('view engine', 'handlebars')

// BodyParser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Express Validator
app.use(expressValidator({
    errorFormatter(param, msg, value) {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root

        while (namespace.length) {
            formParam += `[${namespace.shift()}]`
        }

        return {
            param: formParam,
            msg,
            value
        }
    }
}))

// connect-flash middleware
app.use(flash())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

app.use('/', routes)
app.use('/users', users)

// Set the port
app.set('port', (process.env.PORT || 3000))

// Start the application
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`)
})
