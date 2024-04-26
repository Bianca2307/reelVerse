import { BiBookmarkHeart } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";

import Button from "../../components/common/Button";
import user from "../../assets/user.png";
import styles from "./Profile.module.css"

export default function Profile() {
    return (
        <div className={styles["profile-container"]}>
            <img src={user} alt="user-profile" id={styles["user-profile"]} />
            <div className={styles["profile-container__icons"]}>
                <div>
                    <Button
                        size="sm"
                        style={{ height: 65, marginRight: 30 }}
                        type="icon"
                        icon={<BiBookmarkHeart style={{ fontSize: "4rem" }} />}
                    ></Button>
                    <Button
                        size="sm"
                        style={{ height: 65 }}
                        type="icon"
                        icon={<BiPlusCircle style={{ fontSize: "4rem" }} />}
                    ></Button>
                </div>
            </div>
        </div>
    );
}
