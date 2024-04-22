/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import ProgressCircle from "../common/ProgressCircle"

export default function MovieCard(props) {
    const voteAverage = props.vote;
    const maxVote = 10;
    const percentage = (voteAverage / maxVote) * 100;
    
    return (
        <Card className="shadow">
            <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w200${props.image}`}
            />
            <Card.Body>
                <ProgressCircle
                    percent={percentage}
                    trackColor={percentage > 70 ? "#204529" : "#423d0f"}
                    barColor={percentage > 70 ? "#21d07a" : "#d2d531"}
                />
                <Card.Title>{props.title}</Card.Title>
                <Card.Text></Card.Text>
            </Card.Body>
        </Card>
    );
}
