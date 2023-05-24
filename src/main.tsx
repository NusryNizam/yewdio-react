import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Player from "./components/Player.tsx";
import { ContextProvider } from "./NowPlayingContext.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // { path: '/player', element: <div>Player</div>}
  {
    path: "/player",
    element: (
      <Player
      // isPlaying={false}
      // data={{
      //   type: "",
      //   videoId: "",
      //   authorId: "",
      //   author: "",
      //   title: "",
      //   lengthSeconds: 0,
      //   videoThumbnails: [],
      // }}
      // setIsPlaying={() => {}}
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
