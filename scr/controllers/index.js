const express = require('express')
const router = express.Router()
const {LOGIN} = require('./authController')
const {loginPage} = require('./loginPage')
const {adminPage} = require('./userController')
const {TOKEN} = require('../middleware/middleware')
const {regCours, regTeacher, regStudent, regGruop} = require('../controllers/registerController')
const {adminCours} = require('./routeController')
const { logOut } = require('./logOut')


router
.post('/login', LOGIN)
.post('/regcourse',TOKEN, regCours)
.post('/reggroup',TOKEN, regGruop)
.post('/regteacher',TOKEN, regTeacher)
.post('/regstudent',TOKEN, regStudent)
.get('/', loginPage) 
.get('/logout', logOut) 
.get('/admin',TOKEN, adminPage)
.get('/teacher',TOKEN, adminPage)
.get('/student',TOKEN, adminPage)
.get('/admin/:route', TOKEN, adminCours)
.get('/teacher/:route', TOKEN, adminCours)

module.exports = router