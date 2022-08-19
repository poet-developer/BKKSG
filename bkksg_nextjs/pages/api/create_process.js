const db = require("../../config/db");
const { s3 } = require("../../config/aws")

const createProcess = async(req, res, id) => {
     const info = req.body;
     console.log('값 넘어옴'+typeof(info))
     let _c,_public;
     console.log('프로세스로 넘어옴',info);
     try{
       if(info.type === '1' || info.type === '2') _c = info.color
       else if(info.type === '3' || info.type === '4') {
        //  _c = info.coverImg.name
        console.log(info.coverImg.name)
       }
      //  id.replace("raw/","")
 
       _public = filterPublic(info.public);
       await db.query("INSERT INTO content (title, description, cover_src, type_id, public) VALUES (?, ?, ?, ?, ?)", [info.title, info.desc, _c , info.type, _public] ,(err, result) => {
         if (err) throw err;
         console.log('Uploded Contents!');
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

   export default createProcess