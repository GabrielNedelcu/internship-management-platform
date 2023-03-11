import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import UserContextWrapper from "app/contexts/UserContext";
import LanguageContextWrapper from "app/contexts/LanguageContext";

import { queryClient } from "app/queryClient";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <UserContextWrapper>
          <LanguageContextWrapper>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "rgb(15, 28, 112)",
                  fontFamily: "Roboto",
                  fontSize: 16,
                },
              }}
            >
              <App />
            </ConfigProvider>
          </LanguageContextWrapper>
        </UserContextWrapper>
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);
