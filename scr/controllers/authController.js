const IO = require('../utils/IO/io')
const modelPath = require('../model/path')
const {sign} = require('../utils/jwt/jwt')

const users = new IO(`${modelPath}/users.json`)

module.exports = {
   LOGIN: (req,res)=> {
      try {
         const {username, password} = req.body;
         const oldUser = JSON.parse(users.read())
         const foundUser = oldUser.find((e) => e.username == username && e.password == password)
         if (foundUser) {
            res.cookie('token', sign({id: foundUser.id, role:foundUser.role }))
            if(foundUser.role == 'admin'){
               res.redirect('/admin')
            }
            else if (foundUser.role == 'teacher'){
               res.redirect('/teacher')
            }
            else if (foundUser.role == 'student'){
               res.redirect('/student')
            }
            else {
               res.status(401).send({
                  status: 401, 
                  message: 'Unauthorized'
               })
            }
         }
         else {
            res.status(401).send({
               status: 401, 
               message: 'Unauthorized'
            })
         }         
      } catch (error) {
         res.status(401).send({
            status: 401, 
            message: 'Unauthorized'
         })
      }
   }
   
}