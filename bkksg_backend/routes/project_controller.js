const db = require("../lib/db");

// 패턴3_오늘도 꽃은 피어라.png
module.exports = {
  projectList: (req, res, next) => {
  const info = req.query;
  db.query('SELECT * from project WHERE id = ?',[info.id],(error, project) => {
    if(error) throw error
    db.query('SELECT content.id,content.title,content.description,nickname,topic,project FROM content LEFT JOIN profile ON content.profile_id = profile.author_id JOIN type ON content.type_id = type.id JOIN project ON content.project_id = project.id WHERE project.id = ?',[info.id],(error1, content) => {
      if(error1) throw error1
      res.send({project, content});
  });
  });
},

 create : (req, res, next) => {
     const info = req.body;
     console.log(info);
     debugger;
     db.query("INSERT INTO project (project, project_desc) VALUES (?, ?)", [info.project, info.project_desc] ,(err, result) => {
          if (err) throw err;
          console.log('Uploded The Project!');
        });
 },

 update : (req, res, next) => {
     const info = req.body;
     console.log(info);
     db.query(`UPDATE project SET project=?, project_desc=? WHERE id =?`,[info.project, info.project_desc, info.id],function(error,result){
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
     db.query(`DELETE FROM project WHERE id =?`,[info.id],function(error,result){
       if(error){
         throw error;
       }
       if(result){
         console.log('DELETE');
       }
     });
   },


}