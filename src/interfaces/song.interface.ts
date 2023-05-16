export default interface ISong {
    type: string,
    videoId: string,
    authorId: string,
    author: string,
    title: string,
    lengthSeconds: number,
    adaptiveFormats?: IFormats[],
    thumbnails: IThumbs[]
}

interface IFormats {
    url: string,
    type: string
}

export interface IThumbs {
    url: string
}