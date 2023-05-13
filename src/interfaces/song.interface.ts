export default interface ISong {
    type: string,
    videoId: string,
    authorId: string,
    title: string,
    duration: string,
    adaptiveFormats?: IFormats[]
}

interface IFormats {
    url: string,
    type: string
}