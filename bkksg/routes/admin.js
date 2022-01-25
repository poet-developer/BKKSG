const express = require("express");
const router = express.Router();
const googleDrive = require("../lib/drive");
const multer = require("multer");
const db = require("../lib/db");
const img_controller = require("../lib/img.controller");
const PATH = "tmp/";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});
const uploadTool = multer({ storage: storage });
const controller = require("./crud.controller");
/* Gloadhome page. */
router.get("/", controller.crud);
router.get("/update", controller.update);

router.get("/create",(req, res)=>{
  db.query("SELECT * FROM type", (error0, types) => {
    if (error0) throw error0;
    db.query("SELECT * FROM profile", (error1, profiles) => {
      if (error1) throw error1;
      res.render("create", {
        types : types,
        profiles : profiles
      });
    });
  })
});

//사용 중지
// multer: uploadTool.array("avatar")
router.post("/create_process",(req, res) => {
  const info = req.body;
  console.log('제목 :' + info.title);
  console.log('글쓴이 :' + info.author);
  console.log('장르 :' + info.type);
  console.log('내용 :' + info.desc);

  res.send('내용 :' + info.desc);
  //   "create", {
  //   file_name: req.files[0].originalname ,
  //   info: req.body
  // });
});
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

/* <MYSQL CMD>> */

// select content.id,title,description,nickname,topic,url from content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN image ON content.image_id = image.id JOIN type ON content.type_id = type.id;
