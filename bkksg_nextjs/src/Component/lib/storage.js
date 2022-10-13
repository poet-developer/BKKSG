import {s3} from "../../../config/aws"
import mime from "mime-types"
import multerS3 from "multer-s3"
import uuid from 'react-uuid'
import multer from "multer";
let idTomulterS3;

const storageCover = multerS3({
     s3,
     bucket: "bkksg-images",
     key: (req, file, cb) => {
       let _id;
       console.log('정보추출:',req.body);
       if(req.body.img_id) _id  = `raw/${req.body.img_id}`;
       else {
         _id = `raw/${uuid()}.${mime.extension(file.mimetype)}`;
         idTomulterS3 = _id;
       }
       cb(null, _id); 
     }
   })

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, "./public/uploads");
     },
     filename: function (req, file, cb) {
      let _id;
      if(req.body.img_id) _id  = `raw/${req.body.img_id}`;
      else {
        _id = `raw/${uuid()}.${mime.extension(file.mimetype)}`;
      }
       cb(null, _id);
     },
   });

const filterPublic = (data) =>{
if(data === 'true' || data === '1') return 1
else return 0
}

const NextConnextObj = {
     onError(error, req, res) {
       res
         .status(501)
         .json({ error: `Sorry something Happened! ${error.message}` });
     },
     onNoMatch(req, res) {
       res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
     },
   };

   export {storageCover, filterPublic, NextConnextObj}