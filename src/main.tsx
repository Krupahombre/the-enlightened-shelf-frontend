import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import Router from "./pages/Router.tsx";
import { StorageContext, storage } from "./storage/Storage.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StorageContext.Provider value={storage}>
      <NextUIProvider>
        <RouterProvider router={Router} />
        <Toaster position="bottom-right" reverseOrder={false} />
      </NextUIProvider>
    </StorageContext.Provider>
  </React.StrictMode>
);
