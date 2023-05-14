import { FunctionComponent } from "react";

interface ListItemProps {
    videoId: string,
    title: string,
    playSong: (id: string) => void,
}
 
const ListItem: FunctionComponent<ListItemProps> = (props) => {
    return (  
        <li role="button" onClick={() => props.playSong(props.videoId)}>
            <div className="title">{props.title}</div>
        </li>
    );
}
 
export default ListItem;