const IO = require('../utils/IO/io')
const modelPath = require('../model/path')
const {verify} = require('../utils/jwt/jwt')


const allCourses = new IO(`${modelPath}/courses.json`)
const allUsers = new IO(`${modelPath}/users.json`)
const allGruops = new IO(`${modelPath}/gruop.json`)

const oldUsers = JSON.parse(allUsers.read())
const teacherUsers = oldUsers.filter(e => e.role == 'teacher')
const oldCourses = JSON.parse(allCourses.read())
const oldGroups = JSON.parse(allGruops.read()) 


module.exports = {
   regGruop: (req,res)=> {
      try { 
         const {cookies:{token}} = req; 
         const userId =verify(token).data.id
         const userName = oldUsers.find(e => e.id ==  userId).username        
         const newGroup = {}
         const {name, teacher, course} = req.body;
         newGroup.id = oldGroups[oldGroups.length - 1]?.id + 1 || 1;
         newGroup.name = name;
         newGroup.teacher = teacher; 
         newGroup.course = course
         oldGroups.push(newGroup)
         allGruops.write(oldGroups)
         res.render('admin',{username:userName, teachers: teacherUsers, group: oldGroups, courses: oldCourses})
         
      } catch (error) {
         res.status(401).send({
            status: 401, 
            message: 'Unauthorized'
         })
      }
   } ,
   regCours: (req,res)=> {
      try {
         const {cookies:{token}} = req; 
         const userId =verify(token).data.id
         const userName = oldUsers.find(e => e.id ==  userId).username
         const newCours = {}
         const {name, price} = req.body;
         
         newCours.id = oldCourses[oldCourses.length - 1]?.id + 1 || 1;
         newCours.name = name;
         newCours.price = price; 
         oldCourses.push(newCours)
         allCourses.write(oldCourses)
         res.render('admin',{username:userName, teachers: teacherUsers, group: oldGroups, courses: oldCourses})
         
      } catch (error) {
         res.status(401).send({
            status: 401, 
            message: 'Unauthorized'
         })
      }
   } ,
   regTeacher: (req,res)=> {
      try {
         const {cookies:{token}} = req; 
         const userId =verify(token).data.id
         const userName = oldUsers.find(e => e.id ==  userId).username
         const newTeacher = {}
         const {username, password, tel} = req.body;
         
         newTeacher.id = oldUsers[oldUsers.length - 1]?.id + 1 || 1;
         newTeacher.username = username;
         newTeacher.password = password; 
         newTeacher.role = 'teacher';
         newTeacher.tel = tel
         oldUsers.push(newTeacher)
         allUsers.write(oldUsers)
         res.render('admin',{username:userName, teachers: teacherUsers, group: oldGroups, courses: oldCourses})
         
      } catch (error) {
         res.status(401).send({
            status: 401, 
            message: 'Unauthorized'
         })
      }
   } ,
   regStudent: (req,res)=> {
      try {
         const {cookies:{token}} = req; 
         const userId =verify(token).data.id
         const userName = oldUsers.find(e => e.id ==  userId).username
         const newStudent = {}
         const {username, password, group, tel} = req.body;
         newStudent.id = oldUsers[oldUsers.length - 1]?.id + 1 || 1;
         newStudent.username = username;
         newStudent.password = password; 
         newStudent.role = 'student'
         newStudent.group = group;
         newStudent.tel = tel
         oldUsers.push(newStudent)
         allUsers.write(oldUsers)
         res.render('admin',{username:userName, teachers: teacherUsers, group: oldGroups, courses: oldCourses})
         
      } catch (error) {
         res.status(401).send({
            status: 401, 
            message: 'Unauthorized'
         })
      }
   }  
   
}