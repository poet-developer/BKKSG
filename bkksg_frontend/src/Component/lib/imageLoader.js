import React, { useState, useEffect } from "react";

const ImageLoader = ({ imageUrl }) => {
  const [isError, setIsError] = useState(false);
  const [hashedUrl, setHashedUrl] = useState(imageUrl);
  const styles = {
    display: isError ? "none" : "block",
    borderRadius: "1rem",
    height: "100%",
    width: "100%",
    objectFit: "cover",
  };

  useEffect(() => {
    let intervalId;
    if (isError && !intervalId) 
      intervalId = setInterval(() => {
        setHashedUrl(`${imageUrl}#${Date.now()}`);
      }, 1000);
    else if (!isError && intervalId) clearInterval(intervalId);
    else setHashedUrl(imageUrl)
    return () => clearInterval(intervalId)
  }, [isError, setHashedUrl, imageUrl])
  return (
    <img
      style={styles}
      alt=""
      onError={() => setIsError(true)}
      onLoad={() => setIsError(false)}
      src={hashedUrl}
    />
  );
};

export default ImageLoader;
