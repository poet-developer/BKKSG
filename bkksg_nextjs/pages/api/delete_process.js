const db = require("../../config/db");
const { s3 } = require("../../config/aws")

const deleteProcess = async (req, res) => {
     const info = req.body;
     const params = {
           Bucket: "bkksg-images", 
           Key: `raw/${info.cover_src}`
         }
     try{
     await db.query(`DELETE FROM content WHERE id =?`,[info.id],function(error,result){
       if(error) throw error;
       if(info.type === 3 || info.type === 4) {
         s3.deleteObject(params,(err) =>{
                           if(err) throw err;
                         });
         console.log('Delete Completed.');             
         res.status(200).send();
       }
     })
     }catch(err){
       console.log(err);
       res.status(400).json({message: err.message})
     }
   }

export default deleteProcess