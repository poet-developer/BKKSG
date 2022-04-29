const sharp = require("sharp");
const aws = require("aws-sdk");
const s3 = new aws.S3();

const transfromationOption = [
     {name:"w330", width: 330},
     {name:"w1024", width: 1024}
]

exports.handler = async (event) => {
     // TODO implement
     try{
          const Key = event.Records[0].s3.object.key;
          const keyOnly = Key.split("/")[1];
          console.log(`Image Resizing:${keyOnly}`);
          const image = await s3.getObject({
               Bucket: "bkksg-images",
               Key
          }).promise();

          await Promise.all(transfromationOption.map( async({name, width})=>{
               try{
                    const newKey = `${name}/${keyOnly}`
                    const resizedImage = await sharp(image.Body).rotate().resize({width, height: width, fit: "outside"}).toBuffer() //Resize Image.
                    await s3.putObject({  Bucket: "bkksg-images",
                    Body : resizedImage,
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
 