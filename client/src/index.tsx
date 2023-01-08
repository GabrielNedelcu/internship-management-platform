import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "rgb(15, 28, 112)",
            // colorPrimaryBgHover: "rgb(15, 28, 112)",
            // colorPrimaryTextHover: "white",
            fontFamily: "Roboto",
            fontSize: 16,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>
);
