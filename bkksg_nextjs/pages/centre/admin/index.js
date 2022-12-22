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
    detailHandler(true); // header, siderbar 없애기
    if (SessionStorage.getItem("Admin") === "true") setLogin(true);
    else setLogin(false); //admin에 로그인이 되어있는지 확인
  },[])

  /** Get All Content List from DB */
  const getContentList = () => {
    try{
    axios
      .get("/api/list") // 모든 데이터 리스트를 불러올 것
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
  const readPreviewProcess = (id, mode) => {
    try {
      if (id) {
        axios
          .get("/api/read", { // 특정 콘텐츠 불러올 것(Read)
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
            <TableContent key = {item.id} data = {item} read = {readPreviewProcess} />
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
      let _fileReader = new FileReader() // 이미지 파일 분기 (visual, project)
      cover_src = _pre_data[6]
      _fileReader.readAsDataURL(cover_src)
      _fileReader.onload = (e) => setImageURL(e.target.result)
    } else if (_pre_data[1] === "1" || _pre_data[1] === "2")
      cover_src = _pre_data[5] // 컬러(srring) 분기 (poem, essay)
    setMode("preview") // 관리자 미리보기 모드
    setPre_data({
      public: _pre_data[0],
      type: _pre_data[1],
      title: _pre_data[2],
      desc: _pre_data[3],
      link: _pre_data[4],
      cover_src: cover_src, // 이미지 or color(String)
    });
    setFormData(_formData)
  };

  const createProcess = async() => {
    try {
      await axios
        .post("/api/create_process", formData).then(setMode("")).then(alert("Uploaded!")) // 데이터 생성 후 바로 윈도우를 리로드 시켜 변경된 관리자 페이지를 확인
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  const deleteProcess = (id, type, cover_src) => {
    try {
     axios
        .post("/api/delete_process", { id, type, cover_src })
        .then(alert("deleted."))
        .catch(console.log)
        .finally(window.location.replace("/centre/admin"));
    } catch (err) {
      throw new Error(err)
    }
  }; // 데이터 삭제

  return (
    logined ?  // admin 로그인 여부를 확인
    <>
    {/* Admin Container */}
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
    {/* Admin Container */}
    </>
    : // 로그인 안된 상태라면, 로그인 화면을 보여줄것.
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
