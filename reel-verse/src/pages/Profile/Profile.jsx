import user from '../../assets/user.png'

import { BiBookmarkHeart } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";


export default function Profile() {
    return (
        <div className="profile-container">
            <img src={user} alt="user-profile" id="user-profile" />
            <div className="profile-container__icons">
                <button className="icon-btn">
                    <BiBookmarkHeart style={{ fontSize: "4rem" }} />
                </button>
                <button className="icon-btn">
                    <BiPlusCircle style={{ fontSize: "4rem" }} />
                </button>
            </div>
        </div>
    );
}