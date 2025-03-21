import React, { useState } from "react";
import axios from "axios";
import TextEditor from "../lib/TextEditor";
/**
 * 기존 데이터를 불러와 TextEditor를 통해 Update를 지원한다.
 * 구조는 Create Comp와 유사하다.
 */

const Update = (props) => {
  const { data, types } = props;
  const [type, setType] = useState(data.type);
  const [title, setTitle] = useState(data.title);
  const [link, setLink] = useState(data.link);
  const [publication, setPublic] = useState(data.public);
  const [c, setC] = useState(data.cover_src);
  const [saved_desc, setContent] = useState(data.desc); // String

  const changeHandler = (e) => {
    let _value = e.target.value;
    let _name = e.target.name;
    if (_name === "type") setType(_value);
    else if (_name === "title") setTitle(_value);
    else if (_name === "public") setPublic(_value);
    else if (_name === "c") setC(_value);
    else if (_name === "link") setLink(_value);
  };

  const handleEditorChange = (e) => {
    setContent(e.target.getContent());
  };

  const submitHandler = (e) => {
    const _confrimed = window.confirm("수정 할까요?");
    e.preventDefault();
    let color, coverImg, imgId;
    if (e.target.c.type === "color") color = e.target.c.value;
    else {
      coverImg = e.target.c.files[0];
      imgId = e.target.img_id.value;
    }
    const formData = new FormData();

    formData.append("public", e.target.public.value);
    formData.append("type", e.target.type.value);
    formData.append("title", e.target.title.value);
    formData.append("desc", saved_desc);
    formData.append("link", e.target.link.value);
    formData.append("id", e.target.id.value);
    formData.append("img_id", imgId);
    formData.append("color", color);
    // An img file's to been used to middleware must be at the end.
    formData.append("coverImg", coverImg);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      api: { bodyParser: false },
    };
    if (_confrimed) {
      // Update Rest API 통신
      try {
        axios
          .patch("/api/update_process", formData, config)
          .then(alert("Updated!"))
          .catch(console.log);
      } catch (err) {
        alert("fail!");
        throw new Error(err);
      }
      window.location.replace("/centre/admin");
    }
  };

  return (
    <label>
      <h4 style={{ margin: "1rem 0", fontSize: "1.5rem" }}>
        Update Your Content!
      </h4>
      <br />
      <a href="/centre/admin">Back to Admin</a>
      <h5 style={{ color: "red", marginTop: "1rem" }}>
        표지는 수정 할 바에는 삭제하고 다시 만들기 (aws cloud Front 사용중){" "}
      </h5>
      <br />
      <TextEditor
        title={title}
        genre={type}
        initialValue={data.desc}
        typeList={types}
        link={link}
        id={data.id}
        public={publication}
        handleEditorChange={handleEditorChange}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        mode="update"
        c={c}
      ></TextEditor>
    </label>
  );
};

export default Update;
