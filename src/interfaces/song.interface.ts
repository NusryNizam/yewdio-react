export default interface ISong {
  type: string;
  videoId: string;
  authorId: string;
  authorVerified: boolean
  author: string;
  title: string;
  lengthSeconds: number;
  videoThumbnails: IThumbs[];
  adaptiveFormats?: IFormats[];
}

interface IFormats {
  url: string;
  type: string;
}

export interface IThumbs {
  url: string;
}
