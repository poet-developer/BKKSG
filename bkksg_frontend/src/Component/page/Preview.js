const Preview = props => {
  const _data = props.data;
  let _type = Number(_data.type);
  const styles = { maxWidth: "50vw" , margin: "1rem" }
  return (
    <div className="Preview">
      <h1 style = {{fontSize : "32px"}}>[ Preview ]</h1><br/>
      <label>
        [ Cover ]
        <br />
        {_type === 3 || _type === 4 ? (
          <img
            style={styles}
            src={`https://d2oispwivf10h4.cloudfront.net/w330/${_data.cover_src}`}
          />
        ) : (
          <input type="color" value={_data.cover_src || ""} readOnly />
        )}
        {props.imgSrc ? <img style={styles} src={props.imgSrc} /> : ""}
      </label>
      <label  style={{margin: "1rem", display: 'block'}}>
        <h2>제목 : {_data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: _data.desc }} />
        <hr />
      </label>
    </div>
  );
};

export default Preview
