import React, { useState } from "react";
import axios from "axios";
import Update from "./Update";
import Create from "./Create";
import Preview from "./Preview";
import Pagination from "../lib/Pagination";

const Admin = (props) => {
  const { content, type } = props;
  const [page, setPage] = useState(1) // Num
  const [mode, setMode] = useState("admin")//String
  const [data, setData] = useState({}) // Object
  const [pre_data, setPre_data] = useState({})
  const [formData, setFormData] = useState({}) //Object
  const [config, setConfig] = useState({}) // Object
  const [imageURL, setImageURL] = useState("") //String

  let _contentLimit = 10
  let _offset = (page - 1) * _contentLimit
  let _contentList
  let _cover_src
  let _posts = []

  const readPreviewProcess = async (id, mode) => {
    try {
      if (id) {
        await axios
          .get("/admin/read", {
            params: { id },
          })
          .then(res => {
            let _data = res.data;
            setMode(mode)
            setData({
              id,
              public: _data.public,
              type: _data.type_id,
              title: _data.title,
              desc: _data.description,
              cover_src: _data.cover_src,
            })
          })
          .catch(console.log)
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  if (content) {
    if (page) {
      _contentList = content
        .slice(_offset, _offset + _contentLimit)
        .map(list => {
          return (
            <tbody key={list.id}>
              <tr>
                <td> </td>
                <td>{list.topic} </td>
                <td>
                  <a
                    onClick={e => {
                      e.preventDefault();
                      readPreviewProcess(list.id, "read");
                    }}
                    href="/"
                  >
                    {list.title}
                  </a>
                </td>
                <td style = {{paddingLeft: '1rem'}}>{list.public === 1 ? "O" : "X"}</td>
              </tr><tr style = {{display: "block", marginBottom : "1rem"}}></tr>
            </tbody>
          )
     })
    }
  }

  const btnHandler = e => {
    e.preventDefault()
    setMode(e.target.dataset.mode)
  };

  const submitHandler = (_formData, _config) => {
    let _pre_data = []
    for (var value of _formData.values()) {
      _pre_data.push(value)
    }
    if (_pre_data[1] === "3" || _pre_data[1] === "4") {
      _cover_src = _pre_data[5]
      let _fileReader = new FileReader()
      _fileReader.readAsDataURL(_cover_src)
      _fileReader.onload = (e) => setImageURL(e.target.result)
    } else if (_pre_data[1] === "1" || _pre_data[1] === "2")
      _cover_src = _pre_data[4]
    setMode("preview")
    setPre_data({
      public: _pre_data[0],
      type: _pre_data[1],
      title: _pre_data[2],
      desc: _pre_data[3],
      cover_src: _cover_src,
    });
    setFormData(_formData)
    setConfig(_config)
  };

  const createProcess = async () => {
    try {
      await axios
        .post("/admin/create_process", formData, config)
        .then(setMode(""))
      alert("Uploaded!")
      window.location.replace("/centre/admin")
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  const deleteProcess = async (id, type, cover_src) => {
    try {
      await axios
        .post("/admin/delete_process", { id, type, cover_src })
        .then(alert("deleted."))
        .catch(console.log)
        .finally(window.location.replace("/centre/admin"))
    } catch (err) {
      console.error(err)
      throw new Error(err)
    }
  };
  return (
    <>
      <h1 style = {{fontSize : '2rem'}}>
        <a href="/centre/admin" style = {{margin: '0 1rem'}}>ADMIN</a>
      </h1><br/>
      <div style={{ border: "1px solid black" , padding : "1rem"}}>
        <h4>** Contents</h4><br/>
        <table data-admin="contents">
          <thead>
            <tr>
              <th> / </th>
              <th style = {{paddingRight: '2rem'}}>type</th>
              <th>title</th>
              <th>public</th>
            </tr><tr style = {{ display: "block", marginBottom : "1rem" }}></tr>
          </thead>
          {_contentList}
        </table>
        <Pagination
          total={_posts.length}
          limit={_contentLimit}
          page={page}
          setPage={setPage}
        />
      </div>
      <hr/>
      {/* 'create'모드 만드는 버튼 */}
      <button style = {{marginLeft : '0.5rem'}} data-mode="create" onClick={btnHandler}>
          CONTENT
      </button>
      <hr />
      {/* 모드 들어가기 */}
      {mode === "create" ? (
        <Create
          type={type}
          submitHandler={(formData, config) => {
            submitHandler(formData, config);
          }}
        ></Create>
      ) : (
        ""
      )}

      {mode === "preview" && formData ? ( //Preview Mode
        <div>
          <button
            onClick={ e => {
              e.preventDefault()
              const _confrimed = window.confirm("업로드 할까요?")
              if (_confrimed) createProcess()
              else console.log("거부")
            }}
          >
            데이터저장
          </button>
          <Preview data={pre_data} imgSrc={imageURL}></Preview>
        </div>
      ) : (
        ""
      )}

      {data && mode === "read" ? ( //Read Mode
        <div>
          <button style = {{margin: "0.5rem"}} data-mode="update" onClick={btnHandler}>
            update
          </button>
          <form style = {{display : "inline-block"}}
            onSubmit={e => {
              e.preventDefault();
              const _confrimed = window.confirm("삭제 할까요?");
              if (_confrimed) deleteProcess(data.id, data.type, data.cover_src)
              else console.log("거부")
            }}
          >
            <input type="submit" value={"Delete" || ""} />
          </form>
          <Preview data={data}></Preview>
        </div>
      ) : (
        ""
      )}

      {data && mode === "update" ? ( //Update Mode
        <Update data={data} types={type}></Update>
      ) : (
        ""
      )}
    </>
  );
};

export default Admin
