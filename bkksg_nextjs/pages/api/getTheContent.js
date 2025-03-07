const db = require("../../config/db");

const getTypeContent = async (req, res) => {
  // Read를 위한 함수. 보고자 하는 컨텐츠 하나만 DB에서 id를 통해 가져옴(the Content)
  const info = req.query;
  let _query;
  try {
    _query = `SELECT content.id,content.title,content.description,topic,cover_src,link FROM content LEFT JOIN type ON content.type_id = type.id WHERE content.id = ? and public = 1`;

    await db.query(_query, [info.id], (err, contents) => {
      if (err) throw err;
      res.status(200).send(contents[0]);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export default getTypeContent;
