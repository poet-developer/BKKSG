import db from "../../config/db";
import nextConnect from "next-connect";
import multer from "multer";
import {
  storageCover,
  filterPublic,
  NextConnextObj,
} from "../../src/Component/lib/storage";

const updateProcess = nextConnect(NextConnextObj); // 미들웨어 처럼 사용(multer)

var upload = multer({
  storage: storageCover,
  fileFilter: function (req, file, cb) {
    if (
      ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(
        file.mimetype,
      )
    )
      cb(null, true);
    else cb(new Error("Invalid file type."), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 10, //파일 용량 제한 5mb 통일
  },
});

updateProcess.patch(upload.single("coverImg"), async (req, res) => {
  //patch는 수정할때 쓰는 메소드
  const info = req.body;
  let _c, _public;
  // console.log("req", req.file);
  // console.log("body", req.body.title);
  try {
    if (info.type === "1" || info.type === "2") _c = info.color;
    else _c = info.img_id;
    _public = filterPublic(info.public); // 공개여부 확인
    await db.query(
      `UPDATE content SET title=?, description=?, cover_src=?, type_id=?, public=?, link=? WHERE id =?`,
      [info.title, info.desc, _c, info.type, _public, info.link, info.id],
      function (error, result) {
        if (error) throw error;
        if (result) console.log("fixed.");
        res.status(200).send({});
      },
    ); // DB에 업데이트 내용 입력
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

export default updateProcess;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
