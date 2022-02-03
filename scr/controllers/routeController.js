const IO = require('../utils/IO/io')
const modelPath = require('../model/path')

const allCourses = new IO(`${modelPath}/courses.json`)
const allUsers = new IO(`${modelPath}/users.json`)
const allGruops = new IO(`${modelPath}/gruop.json`)

const oldUsers = JSON.parse(allUsers.read())
const teacherUsers = oldUsers.filter(e => e.role == 'teacher')
const studentUsers = oldUsers.filter(e => e.role == 'student')
const oldCourses = JSON.parse(allCourses.read())
const oldGroups = JSON.parse(allGruops.read()) 



module.exports = {
   adminCours: (req,res) =>{
      try{  
         const {route} = req.params; 
            if(route == 'courses') {
               res.render('course',{courses: oldCourses})
         }
         else if (route == 'teacher'){
            res.render('teacher', {teachers: teacherUsers})
         }
         else if (route == 'student') {
            res.render('student',{student: studentUsers})
         }
         else if (route == 'group') {
            res.render('group',{group: oldGroups})
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
