const db = require("../../config/db");

const getTypeContent = async (req, res) => {
  // 컨텐츠 타입별로 불러오는 함수
  const info = req.query;
  let _query;
  try {
    if (info.mode === "home" || info.mode === "") {
      // home or 모드가 없을때(다른 url에서 왔거나, 뒤로가기) 공개된 모든 컨텐츠 가져옴
      _query = `SELECT content.id,content.title,content.description,topic,cover_src,link FROM content LEFT JOIN type ON content.type_id = type.id WHERE public = 1 ORDER BY content.id DESC`;
    } else {
      _query = `SELECT content.id,content.title,content.description,topic,cover_src,link FROM content LEFT JOIN type ON content.type_id = type.id WHERE topic = ? and public = 1 ORDER BY content.id DESC`;
    } // 해당 type에서 공개된 컨텐츠만 전부 가져옴

    await db.query(_query, [info.mode], (err, contents) => {
      if (err) throw err;
      res.status(200).send({ contents }); // db에서 정보 가져오기
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export default getTypeContent;
