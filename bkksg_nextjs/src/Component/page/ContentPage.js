import React, { useState } from "react";
import Content from "../UI/Content";

const ContentPage = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const { themeMode, themeHandler, mode , modalHandler } = props //Theme Mode.

  return (
      <Content
        themeMode={themeMode}
        pullUp={isOpen ? true : false}
        mode = {mode}
        modalHandler={modalHandler}
      />
  );
};

export default ContentPage
