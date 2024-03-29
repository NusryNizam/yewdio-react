import { useCallback, useContext, useEffect, useRef, useState } from "react";

import NowPlayingContext from "./NowPlayingContext";
import NavigationBar from "./components/NavigationBar";
import Player from "./components/Player";
import Snackbar from "./components/Snackbar/Snackbar";

import "./App.css";
import BottomSheet from "./components/BottomSheet/BottomSheet";
import PlaylistDetails from "./components/PlaylistDetails/PlaylistDetails";

function App() {
  const [isHorizontal, setIsHorizontal] = useState(true);

  const nowPlayingContext = useContext(NowPlayingContext);

  const {
    isVisible,
    notification,
    setIsMinimized,
    selectedPlaylist,
    itemsOfSelectedPlaylist,
    isPlaylistShown,
    setIsPlaylistShown,
  } = nowPlayingContext;

  const rootRef = useRef<HTMLDivElement | null>(null);

  const handleResize = useCallback((width: number) => {
    if (width > 1000) {
      setIsMinimized(false);
      setIsHorizontal(false);
    } else {
      setIsMinimized(true);
      setIsHorizontal(true);
    }
  }, []);

  useEffect(() => {
    if (rootRef.current) {
      const width = rootRef.current.clientWidth;

      if (width > 1000) {
        handleResize(1000 + 1);
      }

      window.addEventListener("resize", () => {
        const width = rootRef.current?.clientWidth;

        handleResize(width as number);
      });
    }

    return () => {
      window.removeEventListener("resize", () => {
        handleResize(1000);
      });
    };
  }, [handleResize]);

  const closeModal = () => {
    setIsPlaylistShown(false);
  };

  return (
    <div ref={rootRef}>
      <NavigationBar isHorizontal={isHorizontal} />
      {isVisible && (
        <Snackbar type={notification.type} message={notification.message} />
      )}
      <Player />

      {isPlaylistShown && (
        <BottomSheet title="Title" closeEvent={closeModal}>
          <PlaylistDetails
            name={selectedPlaylist}
            content={itemsOfSelectedPlaylist}
            closeEvent={closeModal}
          />
        </BottomSheet>
      )}

      <div style={{ display: "none" }}>
        <svg
          width="0"
          height="0"
          className="hidden"
          style={{ display: "none" }}
        >
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            id="settings-icon"
          >
            <path d="M20 7h-9"></path>
            <path d="M14 17H5"></path>
            <circle cx="17" cy="17" r="3"></circle>
            <circle cx="7" cy="7" r="3"></circle>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            id="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            id="playlist-icon"
          >
            <path d="M21 15V6"></path>
            <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
            <path d="M12 12H3"></path>
            <path d="M16 6H3"></path>
            <path d="M12 18H3"></path>
          </symbol>
          <symbol
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            id="dashboard-icon"
          >
            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
          </symbol>
        </svg>
      </div>
    </div>
  );
}

export default App;
