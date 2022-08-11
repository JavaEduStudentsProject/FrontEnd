import React from "react";
import ReactDom from "react-dom/client";
import App from "./components/App"
import "./style.css"
import "./footer.css"
import "./header.css"
import "./products.css"


const container = document.getElementById("root");
const root = ReactDom.createRoot(container);

root.render(<App/>);