const db = require("../../config/db");

const list =  async(req, res) => {
     try{
       await db.query("SELECT * FROM type", (err, types) => {
       if (err) throw err;
            db.query(
             `SELECT content.id,content.title,content.description,topic,cover_src, public FROM content LEFT JOIN type ON content.type_id = type.id `,
               (err1, contents) => {
             if (err1) throw err1;
               res.status(200).send(
                 {contents, types}
               );
             });
           });
     }catch(err){
       console.log(err);
       res.status(400).json({message: err.message})
     }
}

export default list