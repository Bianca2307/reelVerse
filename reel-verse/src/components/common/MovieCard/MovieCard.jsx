/* eslint-disable react/prop-types */


import ProgressCircle from "../ProgressCircle/ProgressCircle";
import styles from "./MovieCard.module.css";
import { BASE_IMAGE_URL } from "../../../utils/constants";


export default function MovieCard(props) {
    const voteAverage = props.vote;
    const maxVote = 10;
    const percentage = (voteAverage / maxVote) * 100;

    return (
        <div className={`${styles["card-wrapper"]}`}>
            <div className={styles["card-content"]}>
                <img className={`${styles["card-image"]} ${styles["image"]}`}
                    src={`${BASE_IMAGE_URL}${props.image}`}
                />
                <div className={styles["card-info"]}>
                    <ProgressCircle
                        percent={percentage}
                        trackColor={percentage > 70 ? "#204529" : "#423d0f"}
                        barColor={percentage > 70 ? "#21d07a" : "#d2d531"}
                    />
                    <div className={styles["card-title"]}>
                        {props.title}
                    </div>
                </div>
            </div>
        </div>
    );
}
