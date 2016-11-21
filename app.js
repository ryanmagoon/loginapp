const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressPug = require('express-pug')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongo = require('mongodb')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/loginapp')
const db = mongoose.connection
