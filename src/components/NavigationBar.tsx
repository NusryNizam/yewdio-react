import { FC } from "react";
import {
  TabContent,
  TabIndicator,
  TabList,
  Tabs,
  TabTrigger,
} from "@ark-ui/react";

import Dashboard from "./Dashboard";
import Search from "./Search";
import Playlists from "./Playlists";
import Settings from "./Settings";

import "./NavigationBar.css";

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
        <div className="tab-list-wrapper">
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
                  margin: "auto",
                  mixBlendMode: "lighten",
                }}
              />
            </TabList>
          </div>
        </div>
      </Tabs>
    </nav>
  );
};

export default NavigationBar;
