import React, { useState } from "react";
import Header from "../UI/Header";
import Sidebar from "../UI/Sidebar";
import ImgContent from "../UI/Content";

import Footer from "../UI/Footer";
import "../../static/css/gridSystem.css";

const ContentPage = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const { themeMode, themeHandler, mode } = props //Theme Mode.

  return (
    <div className="grid-container">
      <Header
        themeMode={themeMode}
        themeHandler={themeHandler}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isModal={isModal}
      />
      <Sidebar
        themeMode={themeMode}
        pullUp={isOpen ? true : false}
        setIsOpen={setIsOpen}
      />
      <ImgContent
        themeMode={themeMode}
        pullUp={isOpen ? true : false}
        mode = {mode}
        modalHandler={is =>{
          if (is) setIsModal(true)
          else setIsModal(false)
        }}
      />
      <Footer themeMode={themeMode} />
    </div>
  );
};

export default ContentPage
