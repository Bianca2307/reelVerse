/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";

import ProgressCircle from "../ProgressCircle/ProgressCircle";
import styles from "./MovieCard.module.css";
import { BASE_IMAGE_URL } from "../../../utils/constants";


export default function MovieCard(props) {
    const voteAverage = props.vote;
    const maxVote = 10;
    const percentage = (voteAverage / maxVote) * 100;

    return (
        <Card className={`${styles["shadow"]} ${styles["card"]}`}>
            <Card.Img variant="top" src={`${BASE_IMAGE_URL}${props.image}`} />
            <Card.Body>
                    <ProgressCircle
                        percent={percentage}
                        trackColor={percentage > 70 ? "#204529" : "#423d0f"}
                        barColor={percentage > 70 ? "#21d07a" : "#d2d531"}
                    />
                <Card.Title className={styles["card-title"]}>
                    {props.title}
                </Card.Title>
                <Card.Text> </Card.Text>
            </Card.Body>
        </Card>
    );
}
