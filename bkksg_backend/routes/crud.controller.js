const db = require("../lib/db");
const fs = require("fs");
const html = require("../lib/htmlBox");

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
  crud: (req, res, next) => {
    db.query("SELECT * FROM type", (error0, types) => {
      if (error0) throw error0;
      db.query("SELECT * FROM profile", (error1, profiles) => {
        if (error1) throw error1;
        db.query(
          `SELECT content.id,title,description,nickname,topic FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id`,
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

  update: (req, res, next) => {
    const queryData = req.query;

    db.query("SELECT * FROM type", (error0, types) => {
      if (error0) throw error0;
      db.query("SELECT * FROM profile", (error1, profiles) => {
        if (error1) throw error1;
        db.query(
          `SELECT content.id,title,description,nickname,topic,url FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN image ON content.image_id = image.id JOIN type ON content.type_id = type.id WHERE content.id = ?`,
          [queryData.id],
          (error2, content) => {
            if (error2) throw error2;
            res.render("update", {
              options: html.profileOpt(profiles),
              contents: content,
            });
          }
        );
      });
    });
  },
}
