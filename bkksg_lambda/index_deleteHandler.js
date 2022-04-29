const aws = require("aws-sdk");
const s3 = new aws.S3();

const pathOption = [
     {name:"w330"},
     {name:"w1024"}
]

exports.handler = async (event) => {
     // TODO implement
     try{
          const Key = event.Records[0].s3.object.key;
          const keyOnly = Key.split("/")[1];
          console.log(`Target Image:${keyOnly}`);

          await Promise.all(pathOption.map( async({name})=>{
               try{
                    const newKey = `${name}/${keyOnly}`
                    await s3.deleteObject({ Bucket: "bkksg-images",
                    Key : newKey}).promise();
               }catch(err){
                    throw err;
               }
          }))
          return  {
              statusCode: 200,
              body: event
          };
     }catch(err){
          console.log(err);
          return  {
               statusCode: 500,
               body: event
           }; 
     }
 };
 