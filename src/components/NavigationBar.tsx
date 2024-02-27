import {
  TabContent,
  TabIndicator,
  TabList,
  Tabs,
  TabTrigger,
} from "@ark-ui/react";

import Dashboard from "./Dashboard";
import Playlists from "./Playlists";
import Search from "./Search";
import Settings from "./Settings";

import "./NavigationBar.css";

type NavigationBarProps = {
  isHorizontal: boolean;
};

const NavigationBar = (props: NavigationBarProps) => {
  const { isHorizontal } = props;
  return (
    <nav>
      <Tabs
        orientation={isHorizontal ? "horizontal" : "vertical"}
        defaultValue="dashboard"
      >
        <TabContent value="dashboard">
          <Dashboard />
        </TabContent>
        <TabContent value="search">
          <Search />
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
                  <div className="hide-in-small-screen satoshi-bold">
                    Dashboard
                  </div>
                </button>
              </TabTrigger>
              <TabTrigger value="search">
                <button title="Search">
                  <svg className="icon">
                    <use xlinkHref="#search-icon"></use>
                  </svg>
                  <div className="hide-in-small-screen satoshi-bold">
                    Search
                  </div>
                </button>
              </TabTrigger>
              {/* <TabTrigger value="playlists">
                <button title="Playlists">
                  <svg className="icon">
                    <use xlinkHref="#playlist-icon"></use>
                  </svg>
                  <div className="hide-in-small-screen satoshi-bold">
                    Playlists
                  </div>
                </button>
              </TabTrigger>
              <TabTrigger value="settings">
                <button title="Settings">
                  <svg className="icon">
                    <use xlinkHref="#settings-icon"></use>
                  </svg>
                  <div className="hide-in-small-screen satoshi-bold">
                    Settings
                  </div>
                </button>
              </TabTrigger> */}
              <TabIndicator
                className={
                  isHorizontal
                    ? "tab-indicator"
                    : "tab-indicator tab-indicator-vertical"
                }
              />
            </TabList>
          </div>
        </div>
      </Tabs>
    </nav>
  );
};

export default NavigationBar;
