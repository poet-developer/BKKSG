import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = props => {
  const {
    mode,
    genre,
    c,
    typeList,
    title,
    id,
    link,
    initialValue,
    handleEditorChange,
    changeHandler,
    submitHandler,
    publicHandler,
  } = props
  let _public
  if (mode === "update") _public = props.public
  const [coverType, setCoverType] = useState("") //String
  const [isOpenInput, setOpenInput] = useState(true) //Boolean
  const [checked, setChecked] = useState(_public || false)

  useEffect(() => {
    if (mode === "update") {
      setOpenInput(true);
      openInput(genre, mode);
    }
  }, [])

  const changeInput = e => {
    let _coverValue = Number(e.target.value)
    let _coverInput

    if (_coverValue === 1 || _coverValue === 2)
      _coverInput = <input type="color" name="c" />
    else if (_coverValue === 3 || _coverValue === 4)
      _coverInput = <input type="file" name="c" />

    setOpenInput(true)
    setCoverType(_coverInput)
  };

  const openInput = e => {
    let _coverValue, _coverInput
    let _UPDATE = "update"

    if (mode === "create") _coverValue = Number(e.target.value)
    else _coverValue = e

    // According to this mode,  e'Value is gonna be changed.
    if (_coverValue === 1) {
      if (mode === _UPDATE)
        _coverInput = <input type="color" name="c" defaultValue={c} />
      else _coverInput = <input type="color" name="c" />
    } else if (_coverValue === 2) {
      if (mode === _UPDATE)
        _coverInput = <input type="color" name="c" defaultValue={c} />
      else _coverInput = <input type="color" name="c" />
    } else if (_coverValue === 3) {
      if (mode === _UPDATE)
        _coverInput = (
          <label>
            <em>* Current | {c}</em>
            <input type="hidden" name="img_id" value={c} />
            <br />
            <label>
            &nbsp;| Change <input type="file" name="c" />
            </label>
          </label>
        )
      else _coverInput = <input type="file" name="c" />
    } else if (_coverValue === 4) {
      if (mode === _UPDATE)
        _coverInput = (
          <label>
            <em>* Current | {c}</em>
            <input type="hidden" name="img_id" value={c} /> <br />
            <label>
              Change | <input type="file" name="c" />
            </label>
          </label>
        )
      else _coverInput = <input type="file" name="c" />
    }

    // 선택 옵션 받아옴.
    setOpenInput(true)
    setCoverType(_coverInput)
  };
  let selectTypes, _selectedType
  const UPDATE = "update"
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_TINY_EDITOR
  // 장르 선택 옵션 
  selectTypes = typeList.map(type => {
    if (mode === UPDATE) {
      if (type.id === genre) _selectedType = type.id;
      // filtering target.
    }
    return (
      <option key={type.id} value={type.id}>
        {type.topic}
      </option>
    );
  });

  return (
    <label>
      <form onSubmit={submitHandler}>
        {mode === UPDATE ? (
          <input type="hidden" name="id" value={id || ""} />
        ) : (
          ""
        )}
        <div>
          <label>
          &nbsp;| Title :
            {mode === UPDATE ? (
              <input
                type="text"
                name="title"
                onChange={changeHandler}
                defaultValue={title || ""}
              />
            ) : (
              <input type="text" name="title" placeholder="title" required />
            )}
          </label>
          <label>
            &nbsp;| Type :
            <select
              required
              name="type"
              value={mode === UPDATE ? _selectedType : undefined}
              onChange={
                mode === UPDATE
                  ? e => {
                      changeHandler(e)
                      changeInput(e)
                    } // update mode
                  : openInput // create mode
              }
            >
              <option key="" value="">
                SELECT
              </option>
              {selectTypes}
            </select>
          </label>
          <label>
          &nbsp;| Link :
            {mode === UPDATE ? (
              <input
                type="text"
                name="link"
                onChange={changeHandler}
                defaultValue= {link || null}
              />
            ) : (
              <input
                type="text"
                name="link"
                placeholder="link"
              />
            )}
          </label>
          {isOpenInput ? (
            <label>
              <br />
              &nbsp;| Cover: {coverType}
            </label>
          ) : (
            ""
          )}

          <label>
          &nbsp;| Public :
            {mode === UPDATE ? (
              <input
                type="checkbox"
                name="public"
                onChange={e => {
                  setChecked(!_public)
                  changeHandler(e)
                }}
                defaultChecked={checked || false}
                value={checked || false}
              />
            ) : (
              <input
                type="checkbox"
                name="public"
                value={checked || ""}
                onChange={publicHandler}
              />
            )}
          </label>
          
        </div>
        <br />
        <input style= {{marginTop : "1rem"}} type="submit" value={mode === UPDATE ? "고치기" : "만들기"} />
        <Editor
          apiKey={apiKey}
          initialValue={
            mode === UPDATE ? initialValue : "<em>멋진 글 부탁해요!</em>"
          }
          init={{
            width: 900,
            height: 500,
            toolbar_sticky: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
            a11y_advanced_options: true,
          }}
          onChange={handleEditorChange}
        />
        {/* 이미지 html */}
        {/* {_imginfo} */}
        
      </form>
    </label>
  );
};

export default TextEditor
