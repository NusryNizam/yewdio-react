import { FunctionComponent } from "react";
import { IThumbs } from "../../interfaces/song.interface";
import './ListItem.css'

interface ListItemProps {
    videoId: string,
    title: string,
    author: string,
    thumbnail: IThumbs[] | undefined,
    duration: number,
    playSong: (id: string) => void,
}
 
const ListItem: FunctionComponent<ListItemProps> = (props) => {

    function convertDuration() {
        let readableFormat = new Date(props.duration * 1000).toISOString().slice(11, 19) 
        if(readableFormat.substring(0, 3) === '00:')
            return readableFormat.substring(3)
        else 
            return readableFormat
    }
    return (  
        <li className="list-item" role="button" title={props.title} onClick={() => props.playSong(props.videoId)}>
            <h4 className="title" >{props.title}</h4>
            <div className="author">{props.author}</div>
            <span className="duration">{convertDuration()}</span>

        </li>
    );
}
 
export default ListItem;