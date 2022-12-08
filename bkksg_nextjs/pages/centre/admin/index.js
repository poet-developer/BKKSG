import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from "../../../src/Component/page/Update";
import Create from "../../../src/Component/page/Create";
import Preview from "../../../src/Component/page/Preview";
import Pagination from "../../../src/Component/lib/Pagination";
import SessionStorage from "../../../src/Component/lib/SessionStorage";
import Login from "../../../src/Component/page/Login";
import Auth from "../../../src/Component/lib/auth";
import {TableIndex, TableContent} from "../../../src/Component/UI/Table";
import styled from "styled-components";

const Container = styled.div`
  margin : 5rem 3rem; 
  width: 90vw;
`

const ListSection = styled.section`
  border: 1px solid black; 
  padding : 1rem;
`

const Admin = ({ detailHandler }) => {
  const [page, setPage] = useState(1) 
  const [mode, setMode] = useState("admin")
  const [data, setData] = useState([]) 
  const [pre_data, setPre_data] = useState({})
  const [formData, setFormData] = useState({})
  const [imageURL, setImageURL] = useState("")
  const [content, getContent] = useState("")
  const [type, getType] = useState("")
  const [logined, setLogin] = useState(false)
  const [list, setList] = useState("");
  

  let contentLimit = 10
  let offset = (page - 1) * contentLimit
  let contentList
  let cover_src
  let posts = []

  useEffect(()=>{
    getContentList();
    detailHandler(true);
    if (SessionStorage.getItem("Admin") === "true") setLogin(true);
    else setLogin(false);
  },[])

  /** Get All Content List from DB */
  const getContentList = async () => {
    try{
    await axios
      .get("/api/list")
      .then((res) => {
        getContent(res.data.contents)
        getType(res.data.types)
      })
      .catch(console.log)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  };
  /** */

  /** Get Preview Specific Data */
  const readPreviewProcess = async (id, mode) => {
    try {
      if (id) {
        await axios
          .get("/api/read", {
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
              link: _data.link
            })
          })
          .catch(console.log)
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  /** */

  /** Pagination */
  if (content && page) {
    if (list === '') {
      contentList = content
        .slice(offset, offset + contentLimit)
        .map(item => {
          return (
            <TableContent data = {item} read = {readPreviewProcess} />
          )
     })
    }else{
        contentList = content.filter(item => {
            if(item === "") return item;
            else if(item.title.toLowerCase()
                    .includes(list.toLowerCase()) || item.description.toLowerCase()
                    .includes(list.toLowerCase())) return item   
        }).map(item => {
          return (
          <TableContent data = {item} read = {readPreviewProcess}/>
          )
        }
      )
    }
  }
  /** Pagination */
  const btnHandler = e => {
    e.preventDefault()
    setMode(e.target.dataset.mode)
  };

  const submitHandler = (_formData) => {
    let _pre_data = []
    for (var value of _formData.values()) {
      _pre_data.push(value)
    }
    if (_pre_data[1] === "3" || _pre_data[1] === "4") {
      let _fileReader = new FileReader()
      cover_src = _pre_data[6]
      _fileReader.readAsDataURL(cover_src)
      _fileReader.onload = (e) => setImageURL(e.target.result)
    } else if (_pre_data[1] === "1" || _pre_data[1] === "2")
      cover_src = _pre_data[5]
    setMode("preview")
    setPre_data({
      public: _pre_data[0],
      type: _pre_data[1],
      title: _pre_data[2],
      desc: _pre_data[3],
      link: _pre_data[4],
      cover_src: cover_src,
    });
    setFormData(_formData)
  };

  const createProcess = async () => {
    try {
      await axios
        .post("/api/create_process", formData).then(setMode(""))
      alert("Uploaded!")
      window.location.replace("/centre/admin")
    } catch (err) {
      throw new Error(err)
    }
  }

  const deleteProcess = async (id, type, cover_src) => {
    try {
      await axios
        .post("/api/delete_process", { id, type, cover_src })
        .then(alert("deleted."))
        .catch(console.log)
        .finally(window.location.replace("/centre/admin"));
    } catch (err) {
      throw new Error(err)
    }
  };
  return (
    logined ? 
    <>
    <Container style = {{margin : '5rem 3rem', width: '90vw'}}>
      <header>
      <h1 style = {{fontSize : '2rem'}}>
        <a href="./admin">ADMIN</a>
      </h1><br/><a href="/">Home</a>
      <button
            onClick={ e => {
              e.preventDefault()
              SessionStorage.setItem("Admin", false)
              window.location.replace("/centre/admin")
            }}
            style = {{margin: '1rem'}}
          >
            Logout
      </button>
      </header>
      <ListSection>
        <TableIndex contentList={contentList}/>
        {list === ''
        ?
        <Pagination
          total={posts.length}
          limit={contentLimit}
          page={page}
          setPage={setPage}
        />
        :''
        }
      </ListSection><hr/>
      {/* 'create'모드 만드는 버튼 */}
      <button data-mode="create" onClick={btnHandler}>
          CONTENT
      </button><hr/>
      {/* 모드 들어가기 */}
      {mode === "create" ? (
        <Create
          type={type}
          submitHandler={(formData, config) => {
            submitHandler(formData, config);
          }}
        />
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
          <Preview data={pre_data} imgSrc={imageURL}/>
        </div>
      ) : (
        ""
      )}

  {/** Read Mode */}
      {data && mode === "read" ? ( //Read Mode
        <div>
          <button data-mode="update" onClick={btnHandler}>
            update
          </button>&nbsp;&nbsp;
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
          <Preview data={data}/>
        </div>
      ) : (
        ""
      )}
      {/** */}

      {data && mode === "update" ? ( 
        <Update data={data} types={type}/> //Update Mode
      ) : (
        ""
      )}
      </Container>
    </>
    : 
    <Login
      login={Auth}
      authenticated={data => {
        SessionStorage.setItem("Admin", true)
        window.location.replace("/centre/admin")
      }}
    />
  );
};

export default Admin
