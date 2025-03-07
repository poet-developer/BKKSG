import { s3 } from "../../../config/aws";
import mime from "mime-types";
import multerS3 from "multer-s3";
import uuid from "react-uuid";
let idTomulterS3;

/** 이미지 업로드를 AWS에 하기위해 필요한 기능들 */

const storageCover = multerS3({
  // multer-s3
  s3,
  bucket: "bkksg-images",
  key: (req, file, cb) => {
    let _id;
    console.log("정보추출:", req.body);
    if (req.body.img_id) _id = `raw/${req.body.img_id}`;
    else {
      _id = `raw/${uuid()}.${mime.extension(file.mimetype)}`;
      idTomulterS3 = _id;
    }
    cb(null, _id);
  },
}); // to AWS Storage

const filterPublic = (data) => {
  // 컨텐츠 공개 여부를 결정하는 함수
  if (data === "true" || data === "1") return 1;
  else return 0;
};

const NextConnextObj = {
  // 미들웨어를 만드는 함수 (stackoverflow 참고)
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
};

export { storageCover, filterPublic, NextConnextObj };
