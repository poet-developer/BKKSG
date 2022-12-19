const db = require("../../config/db");

const list =  async(req, res) => { // 공개여부에 상관없이 모든 글을 불러온다. (for Admin)
     try{
       await db.query("SELECT * FROM type", (err, types) => {
       if (err) throw err;
            db.query(
             `SELECT content.id,content.title,content.description,topic,cover_src, public,link FROM content LEFT JOIN type ON content.type_id = type.id ORDER BY content.id DESC`,
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