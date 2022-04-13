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
module.exports = {
  contentList: (req, res) => {
    // 이 기능은 admin 홈으로 쓰이며, preview, update 항목의 기존 내용을 불러올 때, 즉 정보를 읽을때 사용.
    db.query("SELECT * FROM type", (error0, types) => {
      if (error0) throw error0;
      db.query("SELECT * FROM profile", (error1, profiles) => { 
        if (error1) throw error1;
          db.query(
            `SELECT content.id,content.title,content.description,nickname,topic,cover_src FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id `,
              (error2, contents) => {
            if (error2) throw error2;
              res.send(
                {contents, types, profiles}
              );
            });
          });
        });
  },
  
  create: (req, res, next) => {
    const info = req.body;
    let _c;
    console.log('프로세스로 넘어옴',info);
    if(info.type === '1' || info.type === '2'){
      _c = info.color
    }else if(info.type === '3' || info.type === '4'){
      _c = getMostRecentFile('public/images/covers').file;
    }
    db.query("INSERT INTO content (title, description, cover_src, type_id, profile_id) VALUES (?, ?, ?, ?, ?)", [info.title, info.desc, _c , info.type, info.author] ,(err, result) => {
      if (err) throw err;
      console.log('Uploded Contents!');
    });
  },

  update: (req, res) => {
    const info = req.body;
    let _c;
    console.log(info);
    if(info.type == 1 || info.type == 2){
      _c = info.color;
    }else{
      _c = info.img_id;
      console.log(_c);
      //목록에서 찾기.
    }
    console.log(info)
    db.query(`UPDATE content SET title=?, description=?, cover_src=?, type_id=?, profile_id=? WHERE id =?`,[info.title, info.desc, _c, info.type, info.author, info.id],function(error,result){
      if(error){
        throw error;
      }
      if(result){
        console.log('fixed.');
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
        console.log('deleted.');
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

  getTypeContent : (req, res) => {
    const info = req.query;
    let _query;
    
    if(info.mode === 'home'){
      _query = `SELECT content.id,content.title,content.description,nickname,topic,cover_src,public FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id ORDER BY content.id DESC`
    }else{
      _query = `SELECT content.id,content.title,content.description,nickname,topic,cover_src,public FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id WHERE topic = ? ORDER BY content.id DESC`
    }

    db.query(
      _query,[info.mode],
      (err, contents) => {
        if (err) throw err;
        res.send(
          {contents}
        );
      });
  }
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