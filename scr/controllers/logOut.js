
module.exports = {
   logOut (req,res) {
      try{
         res.clearCookie('token')
         res.redirect('/') 
         
          
      } catch(error) {
         res.statu(500).send({
            message: error.message
         })
      }
   }
}
