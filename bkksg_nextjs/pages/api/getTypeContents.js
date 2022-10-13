const db = require("../../config/db");

const getTypeContent =  async (req, res) => {
     const info = req.query;
     let _query;
     try{
       if(info.mode === 'home' || info.mode === '' ){
         _query = `SELECT content.id,content.title,content.description,topic,cover_src,link FROM content LEFT JOIN type ON content.type_id = type.id WHERE public = 1 ORDER BY content.id DESC`
       }else{
         _query = `SELECT content.id,content.title,content.description,topic,cover_src,link FROM content LEFT JOIN type ON content.type_id = type.id WHERE topic = ? and public = 1 ORDER BY content.id DESC`
       }
 
       await db.query(
         _query,[info.mode],
         (err, contents) => {
           if (err) throw err;
           res.status(200).send(
             {contents}
           );
         });
     }catch(err){
       console.log(err);
       res.status(400).json({message: err.message})
     }
   }
 
   export default getTypeContent