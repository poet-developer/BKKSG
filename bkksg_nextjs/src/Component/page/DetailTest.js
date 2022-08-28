import React, { useState } from "react";

const DetailTest = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const { themeMode, themeHandler, mode , modalHandler } = props //Theme Mode.
  console.log('모델헨들라',modalHandler)

  return (
     <h1>상세피이지 열기</h1>
  );
};

export default DetailTest
