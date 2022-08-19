const db = require("../../config/db");
const { s3 } = require("../../config/aws")

const updateProcess = async (req, res) => {
     const info = req.body;
     let _c, _public;
     try{
       console.log(info)
       if(info.type === '1' || info.type === '2') _c = info.color
       else _c = info.img_id
       _public = filterPublic(info.public);
       await db.query(`UPDATE content SET title=?, description=?, cover_src=?, type_id=?, public=? WHERE id =?`,[info.title, info.desc, _c, info.type, _public, info.id],function(error,result){
         if(error) throw error
         if(result) console.log('fixed.')
         res.status(200).send();
       });
     }catch(err){
       console.log(err);
       res.status(400).json({message: err.message})
     }
   }

   const filterPublic = (data) =>{
    if(data === 'true' || data === '1') return 1
    else return 0
  }

   export default updateProcess