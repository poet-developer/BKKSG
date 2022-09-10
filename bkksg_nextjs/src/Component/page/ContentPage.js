import React, { useState, useEffect } from "react";
import Content from "../UI/Content";

const ContentPage = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const { themeMode, themeHandler, mode , detailHandler } = props //Theme Mode.

  return (
      <Content
        themeMode={themeMode}
        pullUp={isOpen ? true : false}
        mode = {mode}
        detailHandler={detailHandler}
        isModal = {isModal}
        modalHandler={is =>{
          if (is) setIsModal(true)
          else setIsModal(false)
        }}
      />
  );
};

export default ContentPage
