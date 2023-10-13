import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import Router from "./pages/Router.tsx";
import { StorageContext, storage } from "./storage/Storage.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StorageContext.Provider value={storage}>
      <NextUIProvider>
        <RouterProvider router={Router} />
      </NextUIProvider>
    </StorageContext.Provider>
  </React.StrictMode>
);
