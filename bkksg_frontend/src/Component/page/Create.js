import React, { useState } from "react"
import TextEditor from "../lib/TextEditor"

// Function Component
const Create = props => {
  const [desc, setDesc] = useState("")
  const [publicValue, setPublic] = useState(false)

  const handleEditorChange = e => {
    setDesc(e.target.getContent())
  };

  const submitHandler = e => {
    // Send Selected Data for Preview.
    e.preventDefault()
    let color, coverImg
    if (e.target.c.type === "color") color = e.target.c.value;
    else if (e.target.c.type === "file") coverImg = e.target.c.files[0]

    const formData = new FormData()
    formData.append("public", publicValue)
    formData.append("type", e.target.type.value)
    formData.append("title", e.target.title.value)
    formData.append("desc", desc)
    formData.append("color", color)
    // An img file's to been used to middleware must be at the end.
    formData.append("coverImg", coverImg)
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      props.submitHandler(formData, config)
    } catch (err) {
      alert("fail!")
      throw err
    }
  };

  return (
    <TextEditor
      typeList={props.type}
      public={publicValue}
      handleEditorChange={handleEditorChange}
      submitHandler={submitHandler}
      mode="create"
      publicHandler={() => {
        setPublic(!publicValue)
      }}
    ></TextEditor>
  );
};

export default Create
