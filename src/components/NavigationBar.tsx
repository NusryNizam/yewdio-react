import { FC } from "react";
import {
  TabContent,
  // TabIndicator,
  TabList,
  Tabs,
  TabTrigger,
} from "@ark-ui/react";
import Search from "./Search";

import "./NavigationBar.css";

import SearchIcon from "../assets/search.svg";
import DashboardIcon from "../assets/dashboard.svg";
import PlaylistIcon from "../assets/playlist.svg";
import SettingsIcon from "../assets/settings.svg";
import Dashboard from "./Dashboard";


type NavProp = {
  playSong(id:string): void;
}
const NavigationBar: FC<NavProp> = (props) => {

  return (
    <nav>
      <Tabs>
        <TabContent value="dashboard">
          <Dashboard />
        </TabContent>
        <TabContent value="search">
          <Search playSong={props.playSong}/>
        </TabContent>
        <TabContent value="playlists">Playlistis content</TabContent>
        <TabContent value="settings">Settings content</TabContent>
        <div className="tab-list">
          <TabList>
            <TabTrigger value="dashboard">
              <button>
                <img src={DashboardIcon} alt="" />
              </button>
            </TabTrigger>
            <TabTrigger value="search">
              <button>
                <img src={SearchIcon} alt="" />
              </button>
            </TabTrigger>
            <TabTrigger value="playlists">
              <button>
                <img src={PlaylistIcon} alt="" />
              </button>
            </TabTrigger>
            <TabTrigger value="settings">
              <button>
                <img src={SettingsIcon} alt="" />
              </button>
            </TabTrigger>
          </TabList>
        </div>
      </Tabs>
      {/* <Tab.Group>
        <Tab.Panels>
          <Tab.Panel>Home Content</Tab.Panel>
          <Tab.Panel>
            <Search />
          </Tab.Panel>
          <Tab.Panel>Playlists</Tab.Panel>
          <Tab.Panel>Settings</Tab.Panel>
        </Tab.Panels>
        <div className="tab-list">
        <Tab.List>
          <Tab>
            <img src={DashboardIcon} alt="search" />
          </Tab>
          <Tab>
            <img src={SearchIcon} alt="search" />
          </Tab>
          <Tab>
            <img src={PlaylistIcon} alt="search" />
          </Tab>
          <Tab>
            <img src={SettingsIcon} alt="search" />
          </Tab>
        </Tab.List>
        </div>
      </Tab.Group> */}
    </nav>
  );
};

export default NavigationBar;
