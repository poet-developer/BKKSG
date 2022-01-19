const db = require("../lib/db");
const html = require("../lib/htmlBox");
const googleDrive = require("../lib/drive.js");

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
          `SELECT content.id,title,description,nickname,topic,drive_id FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN image ON content.image_id = image.id JOIN type ON content.type_id = type.id`,
          (error2, contents) => {
            if (error2) throw error2;
              // console.log(data[2]);
              res.render("crud", {
                contents: contents,
                html: html.CRUD.create(profiles),
                type: html.TYPE(types),
              });
            });
          }
        );
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
};
