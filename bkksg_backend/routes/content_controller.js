const db = require("../lib/db");
const img_controller = require("../lib/img.controller");
const googleDrive = require("../lib/drive.js");
const { file } = require("googleapis/build/src/apis/file");

const TMP_PATH = './tmp'
async function googleApiOAuth2() {
  const initPromise = await googleDrive.loadList();
  return initPromise;
}
// 패턴3_오늘도 꽃은 피어라.png
module.exports = {
  contentList: (req, res, next) => {
    // 이 기능은 admin 홈으로 쓰이며, preview, update 항목의 기존 내용을 불러올 때, 즉 정보를 읽을때 사용.
    db.query("SELECT * FROM type", (error0, types) => {
      if (error0) throw error0;
      db.query("SELECT * FROM profile", (error1, profiles) => { 
        if (error1) throw error1;
         db.query("SELECT * FROM project", (error2, projects) => {
          if (error2) throw error2;
          db.query(
              `SELECT content.id,content.title,content.description,nickname,topic,project FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id JOIN project ON content.project_id = project.id`,
              (error3, contents) => {
            if (error3) throw error2;
            // tmp 파일 조사 후 다 살아있으면, skip.
            // tmp 파일 조사 후 없으면, 다운
            // img_controller.updateTmpDir(TMP_PATH, img_controller.inspectingTmpDir, googleDrive.downloadFile);
              res.send(
                {contents, types, profiles, projects}
              );
            });
          });
        });
      });
  },

  update: (req, res, next) => {
    const info = req.body;

    db.query(`UPDATE content SET title=?, description=?, type_id=?, profile_id=?, project_id=? WHERE id =?`,[info.title, info.desc, info.type, info.author, info.project, info.id],function(error,result){
      if(error){
        throw error;
      }
      if(result){
        console.log('수정됨:',result);
      }
    });
  },

  delete: (req, res, next) => {
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

  read: (req, res, next) => {
    const info = req.query;
    db.query('SELECT content.id,content.title,content.description,nickname,topic,project FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id JOIN project ON content.project_id = project.id WHERE content.id = ?',[info.id],(error, content) => {
      if(error) throw error
        res.send(content[0]);
    });
  },
}
