import INotification from "./notification.interface";
import PlaylistInterface from "./playlist.interface";
import ISong from "./song.interface";

export default interface IState {
  playFavourites: () => void;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  overflow: boolean;
  setOverflow: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  nowPlaying: ISong;
  setNowPlaying: React.Dispatch<React.SetStateAction<ISong>>;
  notification: INotification;
  setNotification: React.Dispatch<React.SetStateAction<INotification>>;
  audioSrc: string;
  setAudioSrc: React.Dispatch<React.SetStateAction<string>>;
  convertDuration: (audioDuration: number) => string;
  showNotification: (
    notificationSettings: INotification,
    duration?: number
  ) => void;
  currentTime: number;
  progress: number;
  forwardTen: () => void;
  rewindTen: () => void;
  addToLikes: () => void;
  checkIfLiked: (selectedVideoId: string) => void;
  likes: ISong[];
  selectedPlaylist: string;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<string>>;
  itemsOfSelectedPlaylist: PlaylistInterface["content"];
  setItemsOfSelectedPlaylist: React.Dispatch<React.SetStateAction<ISong[]>>;
  isPlaylistShown: boolean;
  setIsPlaylistShown: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlayingFavourites: React.Dispatch<React.SetStateAction<boolean>>;
}
