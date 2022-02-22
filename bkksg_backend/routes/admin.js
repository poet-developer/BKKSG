const express = require("express");
const router = express.Router();
const googleDrive = require("../lib/drive");
const multer = require("multer");
const db = require("../lib/db");
const img_controller = require("../lib/img.controller");
const PATH = "./bkksg_backend/tmp/";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PATH); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});
const uploadTool = multer({ storage: storage });
const contentController = require("./content_controller");
const projectController = require("./project_controller");
// admin home _ READ
router.get("/", contentController.contentList);
router.get("/read", contentController.read);
router.get("/read_project", projectController.projectList);
// WYSWYG image upload url
router.post("/axios_process", uploadTool.single('imgInfo'), (req, res, next) => {
  console.log('파일정보',req.file);
  console.log('파일이름',req.file.filename);
})

router.get("/update", contentController.update);


//사용 중지
// multer: uploadTool.array("avatar")

router.post("/create_process",(req, res) => {
  const info = req.body;
  let imgInfo = [];

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
  db.query("INSERT INTO content (title, description, type_id, profile_id, project_id) VALUES (?, ?, ?, ?, ?)", [info.title, info.desc, info.type, info.author, info.project] ,(err, result) => {
    if (err) throw err;
    console.log('Uploded Contents!');
  });

  
  // console.log('제목 :' + info.title);
  // console.log('글쓴이 :' + info.author);
  // console.log('장르 :' + info.type);
  // console.log('내용 :' + info.desc);
  
  // res.redirect('/admin')
});

router.post("/project/create_process",projectController.create);
router.post("/project/update_process",projectController.update);
router.post("/project/delete_process",projectController.delete);
router.post("/update_process",contentController.update)
router.post("/delete_process",contentController.delete)
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
