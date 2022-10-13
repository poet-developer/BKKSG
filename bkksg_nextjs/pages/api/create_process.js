import db from '../../config/db'
import nextConnect from "next-connect";
import multer from "multer";
import {storageCover, filterPublic, NextConnextObj} from '../../src/Component/lib/storage'
   
   const createProcess = nextConnect(NextConnextObj);
   var upload = multer({ storage: storageCover,
                          fileFilter: function (req, file, cb) {
                            if(['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(file.mimetype)) cb(null, true)
                            else cb(new Error("Invalid file type."),false)
                          },
                          limits:{
                            fileSize: 1024 * 1024 * 10,
                          } 
                          });
  
   createProcess.post(upload.single("coverImg"), async(req, res) => { 
     const info = req.body
     let _c,_public
    console.log("req", req.file);
    console.log("body", req.body);
      try{
       if(info.type === '1' || info.type === '2') {
         _c = info.color
         console.log('info',info)
       }
       else if(info.type === '3' || info.type === '4') {
         console.log('name',req.file.filename)
         _c = req.file.key.replace("raw/","")
       }
       _public = filterPublic(info.public);
       await db.query("INSERT INTO content (title, description, cover_src, type_id, public,link) VALUES (?, ?, ?, ?, ?, ?)", [info.title, info.desc, _c , info.type, _public, info.link] ,(err, result) => {
         if (err) throw err;
         console.log('Uploded Contents!');
         res.status(200).send();
       });
     }catch(err){
       console.log(err);
       res.status(400).json({message: err.message})
     }
   });
    
  export default createProcess;
   export const config = {
     api: {
       bodyParser: false, // Disallow body parsing, consume as stream
     },
   };