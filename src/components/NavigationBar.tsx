import { FC } from "react";
import {
  TabContent,
  TabIndicator,
  TabList,
  Tabs,
  TabTrigger,
} from "@ark-ui/react";

import Search from "./Search";

import "./NavigationBar.css";

import Dashboard from "./Dashboard";
import Playlists from "./Playlists";
import Settings from "./Settings";

type NavProp = {
  playSong: (id: string) => void;
};

const NavigationBar: FC<NavProp> = (props) => {
  return (
    <nav>
      <Tabs defaultValue="dashboard">
        <TabContent value="dashboard">
          <Dashboard />
        </TabContent>
        <TabContent value="search">
          <Search playSong={props.playSong} />
        </TabContent>
        <TabContent value="playlists">
          <Playlists />
        </TabContent>
        <TabContent value="settings">
          <Settings />
        </TabContent>

        <div className="tab-list">
          <TabList>
            <TabTrigger value="dashboard">
              <button title="Dashboard">
                <svg className="icon">
                  <use xlinkHref="#dashboard-icon"></use>
                </svg>
              </button>
            </TabTrigger>
            <TabTrigger value="search">
              <button title="Search">
                <svg className="icon">
                  <use xlinkHref="#search-icon"></use>
                </svg>
              </button>
            </TabTrigger>
            <TabTrigger value="playlists">
              <button title="Playlists">
                <svg className="icon">
                  <use xlinkHref="#playlist-icon"></use>
                </svg>
              </button>
            </TabTrigger>
            <TabTrigger value="settings">
              <button title="Settings">
                <svg className="icon">
                  <use xlinkHref="#settings-icon"></use>
                </svg>
              </button>
            </TabTrigger>
            <TabIndicator
              style={{
                backgroundColor: "#0f6bff",
                maxWidth: "100px",
                height: "64px",
                margin: 'auto',
                mixBlendMode: 'lighten'
              }}
            />
          </TabList>
        </div>
      </Tabs>

      {/* SVG Sprite */}
      <svg width="0" height="0" className="hidden">
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          // fill="none"
          // stroke="currentColor"
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
          // fill="none"
          // stroke="currentColor"
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
          // fill="none"
          // stroke="currentColor"
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
          // fill="none"
          // stroke="currentColor"
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
    </nav>
  );
};

export default NavigationBar;
