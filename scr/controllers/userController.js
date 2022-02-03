const {verify} = require('../utils/jwt/jwt')
const IO = require('../utils/IO/io')
const modelPath = require('../model/path')

const allCourses = new IO(`${modelPath}/courses.json`)
const allUsers = new IO(`${modelPath}/users.json`)
const allGroups = new IO(`${modelPath}/gruop.json`)
const oldUsers = JSON.parse(allUsers.read())

const oldCourses = JSON.parse(allCourses.read())
const oldGroups = JSON.parse(allGroups.read())

module.exports = {
   adminPage: (req,res) =>{         
      try{
         const teacherUsers = oldUsers.filter(e => e.role == 'teacher')
        
         const {cookies:{token}} = req; 
         const userRole = verify(token).data.role
         const userId =verify(token).data.id
         const userName = oldUsers.find(e => e.id ==  userId).username
         const userGroup = oldGroups.filter(e => e.teacher == userName)
         
         const userStudent = oldUsers.filter(e => e.role == 'student')
         const teacherStudent = userGroup.map((e)=> userStudent.filter(el=> el.group == e.name))
         
         if(userRole == 'admin') {
            res.render('admin',{username: userName, teachers: teacherUsers, group: oldGroups, courses: oldCourses})
         }
         else if (userRole == 'teacher'){
            res.render('teacherPage', {username: userName, group: userGroup, students: teacherStudent})
         }
         else if (userRole == 'student') {
            res.render('studentPage', {username: userName, group: userGroup})
         }
         else {
            res.status(401).send({
               status: 401, 
               message: 'Unauthorized'
           })
         }
           
      } catch(error) {
         res.status(401).send({
            status: 401, 
            message: 'Unauthorized'
        })
      }
   }
}
