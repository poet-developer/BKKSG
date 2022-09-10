const db = require("../../config/db");

const read = async (req, res) => {
     const info = req.query;
     try{
       await db.query('SELECT id,title,description,cover_src,type_id,public,link FROM content WHERE content.id = ?',[info.id],(error, content) => {
         if(error) throw error
           res.status(200).send(content[0]);
       });
     }catch(err){
       console.log(err);
       res.status(400).json({message: err.message})
     }
   }

export default read