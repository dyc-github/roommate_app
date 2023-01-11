//TODO once backend is finished actually support user avatars

import { useContext } from "react";
import { Avatar } from "react-native-paper";
import UserContext from "../context/user-context";

const UserAvatar = (props) => {
    UserContext = useContext(UserContext);
    return <Avatar.Text size={props.size} label={"JK"}/>
}
export default UserAvatar;
