import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ContextProvider } from "./NowPlayingContext.tsx";
import Player from "./components/Player.tsx";
import App from "./App.tsx";

import "./index.css";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/player",
    element: <Player />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
