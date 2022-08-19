import React from "react"
import ReactDOM from "react-dom/client"
import Bkksg from "./Bkksg"
import reportWebVitals from "./reportWebVitals"
const rootNode = document.getElementById('root');
ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <Bkksg />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
