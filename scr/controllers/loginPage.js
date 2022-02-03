
module.exports = {
   loginPage (req,res) {
      try{
         res.render('login')  
      } catch(error) {
         res.json ({
            message: error.message
         })
      }
   }
}
