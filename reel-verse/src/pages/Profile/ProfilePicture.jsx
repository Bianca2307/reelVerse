import { Avatar } from '@mui/material';


export default function ProfilePicture(props) {
    return (
        <Avatar
            src={props.imageUrl}
            style={props.style}
            alt="user-profile"
        />
    );
}
