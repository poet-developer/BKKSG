const db = require("../lib/db");
const img_controller = require("../lib/img.controller");
const googleDrive = require("../lib/drive.js");
const { file } = require("googleapis/build/src/apis/file");
const TMP_PATH = './tmp'
const fs = require('fs')
const path = require("path");
async function googleApiOAuth2() {
  const initPromise = await googleDrive.loadList();
  return initPromise;
}
// 패턴3_오늘도 꽃은 피어라.png
module.exports = {
  contentList: (req, res) => {
    // 이 기능은 admin 홈으로 쓰이며, preview, update 항목의 기존 내용을 불러올 때, 즉 정보를 읽을때 사용.
    db.query("SELECT * FROM type", (error0, types) => {
      if (error0) throw error0;
      db.query("SELECT * FROM profile", (error1, profiles) => { 
        if (error1) throw error1;
          db.query(
              `SELECT content.id,content.title,content.description,nickname,topic FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id`,
              (error2, contents) => {
            if (error2) throw error2;
            // tmp 파일 조사 후 다 살아있으면, skip.
            // tmp 파일 조사 후 없으면, 다운
            // img_controller.updateTmpDir(TMP_PATH, img_controller.inspectingTmpDir, googleDrive.downloadFile);
              res.send(
                {contents, types, profiles}
              );
            });
          });
        });
  },
  
  create: (req, res) => {
    const info = req.body;
    let _c;
    if(info.type == 1 || info.type == 2){
      _c = info.color
    }else{
      _c = getMostRecentFile('./bkksg_backend/public/images/covers').file;
    }
    db.query("INSERT INTO content (title, description, cover_src, type_id, profile_id) VALUES (?, ?, ?, ?, ?)", [info.title, info.desc, _c , info.type, info.author] ,(err, result) => {
      if (err) throw err;
      console.log('Uploded Contents!');
    });
  },

  update: (req, res) => {
    const info = req.body;
    let _c;
    console.log(typeof(info.type))
    if(info.type == 1 || info.type == 2){
      _c = info.color
    }else{
      _c = getMostRecentFile('./bkksg_backend/public/images/covers').file;
    }

    db.query(`UPDATE content SET title=?, description=?, cover_src=?, type_id=?, profile_id=? WHERE id =?`,[info.title, info.desc, _c, info.type, info.author, info.id],function(error,result){
      if(error){
        throw error;
      }
      if(result){
        console.log('수정됨');
      }
    });
  },

  delete: (req, res) => {
    const info = req.body;
    db.query(`DELETE FROM content WHERE id =?`,[info.id],function(error,result){
      if(error){
        throw error;
      }
      if(result){
        console.log('DELETE');
      }
    });
  },

  read: (req, res) => {
    const info = req.query;
    db.query('SELECT id,title,description,cover_src,type_id,profile_id FROM content WHERE content.id = ?',[info.id],(error, content) => {
      if(error) throw error
        res.send(content[0]);
    });
  },
}

function timestamp(){ 
  function pad(n) {return n<10 ? "0"+n : n} d=new Date();
  year = d.getFullYear().toString();return year.substring(2, 4)+ pad(d.getMonth()+1)+ pad(d.getDate())+ pad(d.getHours())+ pad(d.getMinutes())+ pad(d.getSeconds()) 
}

const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[0] : undefined;
};

const orderReccentFiles = (dir) => {
  return fs.readdirSync(dir)
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};