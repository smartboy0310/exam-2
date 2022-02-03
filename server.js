const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000;
const ejs = require('ejs')
const bodyParser = require('body-parser')
const router = require('./scr/controllers')
const cookieParser = require('cookie-parser')
const path = require('path')

app.use(cookieParser())
app.set('view engine', 'ejs')
app.use('/assets', express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())
app.use(router)


app.listen(PORT, console.log('Server ishga tushdi'))