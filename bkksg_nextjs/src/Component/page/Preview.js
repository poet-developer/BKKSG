/** Admin 페이지를 위한 CREATE에서 전달받은 FormData를 가지고 미리보기 view 제작하는 페이지 Preview.
 * 표지 이미지 미리보기용은 AWS S3 Bucket에 /w330 경로에 저화질로 저장된 것을 불러온다.
 */

const Preview = (props) => {
  const _data = props.data;
  let _type = Number(_data.type);
  const styles = { maxWidth: "50vw", margin: "1rem" };
  return (
    <div className="Preview">
      <h1 style={{ fontSize: "32px" }}>[ Preview ]</h1>
      <br />
      <label>
        [ Cover ]
        <br />
        {_type === 3 || _type === 4 ? (
          <img
            style={styles}
            src={`https://d2oispwivf10h4.cloudfront.net/w330/${_data.cover_src}`}
            alt={_data.title}
          />
        ) : (
          <input type="color" value={_data.cover_src || ""} readOnly />
        )}
        {props.imgSrc ? (
          <img style={styles} src={props.imgSrc} alt={_data.title} />
        ) : (
          ""
        )}
      </label>
      <label style={{ margin: "1rem", display: "block" }}>
        <h2>제목 : {_data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: _data.desc }} />
        <hr />
        <h2>* Link : {_data.link === null ? "none" : _data.link}</h2>
      </label>
    </div>
  );
};

export default Preview;
