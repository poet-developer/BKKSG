import aws from "aws-sdk";

const s3 = new aws.S3({
 secretAccessKey : process.env.AWS_ACCESS_SECRET,
 accessKeyId: process.env.AWS_ACCESS_ID,
 region: "ap-northeast-2"
})

module.exports = { s3 }