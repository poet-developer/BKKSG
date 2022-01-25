const fs = require("fs");
const db = require("../lib/db");


module.exports = {
     
     getTargetId : function (files, name) {
          for (var i = 0; i < files.length; i++) {
            if (files[i].name === name) {
              let file = files[i];
              return file.id;
            }
          }
        },

     inspectingTmpDir : function(tmpPath, files) {
          return new Promise((resolve, reject) =>{
                    fs.readdir(tmpPath, (err, tmpFiles) => {
                         if(err) reject(err);
                         const names = [];
                         for(var i =0; i<files.length; i++){
                              names.push(files[i].file_name);
                         }
                         let sth = names.filter(x => !tmpFiles.includes(x));
                         resolve(sth);
                         
                    });
                    });
               },
     
     updateTmpDir : function(tmpPath, inpectFunc, downloadFunc){
          fs.readdir(tmpPath, (err, tmpFiles) => {
               if (err) throw err;
               db.query('SELECT * FROM image',(err1,files)=>{
                 if(err1) throw err1;
                 
                 if(tmpFiles.length === 0){
                   for( var i = 0; i<files.length; i++){
                     downloadFunc(files[i].drive_id, files[i].file_name);
                     console.log(`All download : ${i+1}/${files.length}`);
                   }
                 }                        
                 
                 if(tmpFiles.length !== files.length){
                   for(var i = 0; i<files.length; i++){
                   inpectFunc(tmpPath, files[i])
                   .then(been =>{
                     if(!been.value){
                       console.log(been.file_name + '없음');
                       downloadFunc(been.id, been.file_name);
                     }
                   })
                 }
               }else{
                 console.log('Tmp is fully alive.');
               }
               });
               });
     },

     updateTmpDir: function(tmpPath, inspectimgFunc, downoladingFunc){
          fs.readdir(tmpPath, (err, tmpFiles) => {
            if (err) throw err;
            db.query('SELECT * FROM image',(err1,files)=>{
              if(err1) throw err1;
              
              if(tmpFiles.length === 0){
                for( var i = 0; i<files.length; i++){
                  downoladingFunc(files[i].drive_id, files[i].file_name);
                  console.log(`All download : ${i+1}/${files.length}`);
                }
              }                        
              // 부분 tmp 파일 유실 하면 하나씩 소생시킴.
              // 그러나 이 부분은 나중에 실제로 사이트 만들때 수정이 필요하다
              //case ~ switch 생각 
              if(tmpFiles.length !== files.length){
                inspectimgFunc(tmpPath, files)
                .then(been => {
                  for(var i =0; i<files.length; i++){
                    if(been[0] === files[i].file_name){
                      const target = files[i];
                      downoladingFunc(target.drive_id, target.file_name);
                    }
                  }
                  });
            }else{
              console.log('Tmp is fully alive.');
            }
            });
            });
        }
     
     
}
