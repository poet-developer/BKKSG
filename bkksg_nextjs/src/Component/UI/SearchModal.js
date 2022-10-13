import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import styled from "styled-components"
import axios from "axios";
import { CgChevronLeft } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import SearchResults from "./SearchResults";
import SessionStorage from "../lib/SessionStorage";

const SearchContainer = styled.div`
  animation: modal-show 0.3s;
  background-color: ${props => props.theme.colors.main};
`

const SearchInput = styled.input`
  border-bottom: ${ props => `2px solid ${props.theme.colors.topic} !important` };
  &::placeholder {color:rgba(255,255,255,0.6);
      font-style: italic;
      }
  &::-webkit-input-placeholder {color:rgba(255,255,255,0.6);
      font-style: italic;
      }
  &:-ms-input-placeholder {color:rgba(255,255,255,0.6);
      font-style: italic;
      }
  @media (max-width : 500px) {
    margin-left: 1.5rem;
  }
`

const SubmitButton = styled.button`
  color: ${props => props.theme.colors.topic};
  border-bottom: ${ props => `2px solid ${props.theme.colors.topic} !important` };
  & :hover {
    color: azure;
  }
`

const SearchResultContainer = styled.div`
  box-shadow: ${props => props.theme.glass.searchItemShadow};
  & :-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  @media (max-width : 500px) {
    margin-left: 1.3rem;
    height: 75vh;
  } 
`
const SearchResultItem= styled.div`
  background: ${props => props.theme.colors.card};
  box-shadow: ${props => props.theme.glass.searchItemShadow};
`

const DetailModal = props => {
  const { open, close} = props;
  const router = useRouter();
  const [list, setList] = useState("");
  const [data, setData] = useState([]);

  const SearchProcess = async () => {
    try{
      await axios
        .get("/api/getTypeContents",{
          params: {mode: 'home' },
        })
        .then(res => {
          setData(res.data.contents);
          }
        )
        .catch(console.log)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  };
  
  const goLink = (item, cb) => {
    router.push(`/${item.topic}/${item.id}`)
    SessionStorage.setItem("mode",router.query.mode === undefined ? '' : router.query.mode)
    cb();
  }
  useEffect(()=>{
    SearchProcess();
  },[])

  return (

      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section className = "modal-section">
              <SearchContainer className="search-container">
              <div className = "backBtn" onClick={close}><CgChevronLeft /></div>
              <form style={{minWidth: '410px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
              <SearchInput className="search-input" onChange={
                (e)=>{
                  setList(e.target.value);
              }} type='text' 
              placeholder={"제목·내용으로 조각 찾기"}/>
              <SubmitButton className = "search-submitBtn" onClick = {(e)=>e.preventDefault()}><BiSearch/></SubmitButton>
                </form>
              <SearchResultContainer className="search-result-container">
                {data.filter((item) => {
                              if(item){
                                if(list === "") return item;
                                else if(item.title.toLowerCase()
                                        .includes(list.toLowerCase()) || item.description.toLowerCase()
                                        .includes(list.toLowerCase())) return item   
                              }else{ return ''}
                          }).map((item) => (
                            <SearchResultItem 
                            key={data.indexOf(item)}
                            onClick = {()=>{
                              goLink(item, close)
                            }}
                            className='search-result-item' >
                              <SearchResults data = {item} keyword = {list}/>
                            </SearchResultItem>
                          ))
                }
              </SearchResultContainer>
              </SearchContainer>
          </section>
        ) : null}
      </div>
  );
};

export default DetailModal
