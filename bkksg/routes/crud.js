const express = require("express");
const router = express.Router();
const googleDrive = require("../lib/drive");
const multer = require("multer");
const fs = require("fs");
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
const { google } = require("googleapis");
//구글
// const loadList = googleApiOAuth2();

/* Gloadhome page. */
router.get("/", controller.crud);
router.get("/update", controller.update);
router.post("/create_process", uploadTool.array("avatar"), (req, res, next) => {
  res.send(`
  <form style="display: inline-block;"  action='/admin/img_process' method= 'get'>
     구글에 업로드 할까요?
     <input type ='hidden' name= 'name' value = ${req.files[0].originalname} >
     <input type = 'submit' value = "YES">
     </form>
     <form style="display: inline-block;" action='/admin' method= 'get'>
     <input type = 'submit' value = "NO">
     </form>
     </form>
  `);
});
router.get("/img_process", (req, res, next) => {
  // googleDrive.uploadFile
  const TMP_PATH = "./tmp";
  const targetFileName = req.query.name;
  let check = new Boolean(inspectingTmpDir(TMP_PATH, targetFileName));
  console.log("값이 넘어옴 :" + targetFileName);
  //TMP에 동일 파일이 있는지 조사.
  /**  Using google API */
  // const targetId = getTargetId(files, targetFileName);
  // console.log(targetId);
  console.log("tmp에 있습니다.");
  if (check) {
    if(targetFileName){
    googleDrive.uploadFile(targetFileName);
    }
    res.status(301).redirect("/admin");
    // res.status(301).redirect("/admin");
  } else {
    throw new Error("Can't Upload the file.");
  }
});

// google drive이미지 지우기 && tmp 삭제
router.get('/img_drop', (req, res, next)=>{
  res.render('dropImg', {
    test : ''
  });
});
// app.METHOD(PATH, HANDLER)

module.exports = router;

// onClick="window.location.reload()"
function getTargetId(files, name) {
  for (var i = 0; i < files.length; i++) {
    if (files[i].name === name) {
      let file = files[i];
      return file.id;
    }
  }
}

function inspectingTmpDir(tmpPath, name) {
  fs.readdir(tmpPath, (err, tmpFiles) => {
    if (err) throw err;
    for (var i = 0; i < tmpFiles.length; i++) {
      if (tmpFiles[i] === name) {
        //tmp폴더에 해당 파일 있음.
        return true;
      } else {
        return false;
      }
    }
  });
}

/* <MYSQL CMD>> */

// select content.id,title,description,nickname,topic,url from content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN image ON content.image_id = image.id JOIN type ON content.type_id = type.id;
