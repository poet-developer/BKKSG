const TableIndex = ({contentList}) => {
     return(
     <>
          <h4>** Contents</h4>
          <form style={{textAlign:'right'}}>
          <span>Search : </span><input onChange={
                    e=>{
                    setList(e.target.value);
               }} type='text' 
               placeholder={"제목·내용으로 조각 찾기"}/>
          </form><br/>
          <table data-admin="contents">
               <thead>
               <tr>
               <th> / </th>
               <th style = {{paddingRight: '2rem'}}>type</th>
               <th>title</th>
               <th>public</th>
               </tr><tr style = {{ display: "block", marginBottom : "1rem" }}></tr>
               </thead>
               {contentList}
          </table>
     </>
     )
}


const TableContent = ({data, read}) => {
 return (
     <tbody key={data.id}>
     <tr>
          <td> </td>
          <td>{data.topic} </td>
          <td>
            <a
              onClick={e => {
                e.preventDefault();
                read(data.id, "read");
              }}
              href="/"
            >
              {data.title}
            </a>
          </td>
          <td style={{paddingLeft: "1rem"}}>{data.public === 1 ? "O" : "X"}</td>
        </tr><tr style = {{display: "block", marginBottom : "1rem"}}></tr>
  </tbody>
 )
}

export {TableIndex, TableContent}