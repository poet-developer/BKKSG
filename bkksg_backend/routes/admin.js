const express = require("express");
const router = express.Router();
const googleDrive = require("../lib/drive");
const multer = require("multer");
const db = require("../lib/db");
const img_controller = require("../lib/img.controller");
const PATH_TMP = "./bkksg_backend/tmp/";
const PATH_COVER = "./bkksg_backend/public/images/covers/";
const storageTmp = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH_TMP); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const storageCover = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH_COVER); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    let _c
    let _dataType;
    if(file.mimetype === 'image/jpeg'){
      _dataType = '.jpeg'
    }else if(file.mimetype === 'image/jpg'){
      _dataType = '.jpg'
    }else if(file.mimetype === 'image/png'){
      _dataType = '.png'
    } // set data type to file.

    _c = req.body.title + timestamp().toString() + _dataType
    // Id, type , dataType
    // console.log('미들웨어:',req.body);
    cb(null, _c); 
    // save a file named by the project's title.
  },
});

const uploadCoverTool = multer({ storage: storageCover });

const uploadTool = multer({ storage: storageTmp });
const contentController = require("./content_controller");
// admin home _ READ
router.get("/", contentController.contentList);
router.get("/read", contentController.read);
// WYSWYG image upload url
router.post("/axios_process", uploadTool.single('imgInfo'), (req, res, next) => {
  console.log('파일정보',req.file);
  console.log('파일이름',req.file.filename);
})

router.post("/create_process", uploadCoverTool.single('coverImg'),contentController.create);
router.post("/update_process",uploadCoverTool.single('coverImg'),contentController.update)
router.post("/delete_process",contentController.delete)

// --------------- GOOGLE DRIVE ------------------
router.get("/img_process", (req, res) => {
  // googleDrive.uploadFile
  const targetFileName = req.query.name;
  console.log("값이 넘어옴 :" + targetFileName);
  //TMP에 동일 파일이 있는지 조사.
  /**  Using google API */
    if(targetFileName){
    googleDrive.uploadFile(targetFileName)
    .then(fileId => {
      db.query(`INSERT INTO image (file_name, drive_id) VALUES (?, ?)`,[targetFileName, fileId],(err,result) => {
        if(err) return err
          console.log('img\'s info is saved in db');
        });
      });
    }
    
    db.query(`INSERT INTO content (title, description,type_id, profile_id) VALUES (?, ?, ?, ?)`,[req.query.title, req.query.desc, req.query.type, req.query.author],(err1,content) => {
      if(err1) return err1
      console.log('the content\'s info is saved in db');
      // db에 이미지 정보 저장.
    });
    res.status(301).redirect("/admin");
});

/**  google drive이미지 지우기 && tmp 삭제 input */
router.get('/delete', (req, res)=>{
  googleDrive.loadList()
  .then(db => {
    res.render('delete_img', {
      test : ''
    });
    console.log(db);
  })
  .catch(console.log);
  });

/**  google drive이미지 지우기 && tmp 삭제 처리 */
router.get('/delete/process', (req, res) => {
  const fileId = req.query.drive_id;
  googleDrive.deleteFile(fileId);
  res.status(301).redirect('/admin/delete');
})
// app.METHOD(PATH, HANDLER)

module.exports = router;

// get a Current Time.
function timestamp(){ 
  function pad(n) {return n<10 ? "0"+n : n} d=new Date();
  year = d.getFullYear().toString();return year.substring(2, 4)+ pad(d.getMonth()+1)+ pad(d.getDate())+ pad(d.getHours())+ pad(d.getMinutes())+ pad(d.getSeconds()) 
}

/* <MYSQL CMD>> */

// select content.id,title,description,nickname,topic,url from content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN image ON content.image_id = image.id JOIN type ON content.type_id = type.id;


//사용 중지
// multer: uploadTool.array("avatar")

// let imgInfo = [];

// 이미지 정보를 하나의 객체배열로 추합
// if(info.img_index){
// if(info.img_index.length<2){
//   imgInfo.push({
//     name: info.img_name,
//     url : info.img_url
//   })
// }else{
//   for(var i =0; i<info.img_name.length;i++){
//     imgInfo.push({
//       name: info.img_name[i],
//       url : info.img_url[i]
//     })
//      }
//   }
// }

// res.redirect('/admin')