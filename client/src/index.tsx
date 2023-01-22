import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";
import UserContextWrapper from "app/contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <UserContextWrapper>
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
        </UserContextWrapper>
      </React.StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);
