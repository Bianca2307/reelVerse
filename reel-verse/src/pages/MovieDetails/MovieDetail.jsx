import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import styles from "./MovieDetails.module.css"

export default function MovieDetail() {
    const params = useParams();
    console.log(params);
    const [movieDetail, setMovieDetail] = useState({});
    const [videoKey, setVideoKey] = useState("");
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch(
                `https://api.themoviedb.org/3/movie/${params.id}?api_key=d773193a88ede0c03b5da21759b8dea6&append_to_response=videos`
            ).then((res) => res.json()),
            fetch(
                `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=d773193a88ede0c03b5da21759b8dea6&append_to_response=videos`
            ).then((res) => res.json()),
        ])
            .then(([movieData, recommendationsData]) => {
                setMovieDetail(movieData);
                if (movieData.videos && movieData.videos.results.length > 0) {
                    setVideoKey(movieData.videos.results[0].key);
                }
                setRecommendations(recommendationsData.results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                // Handle errors
            });
    }, []);

    return (
        <div className={styles["details-container"]}>
            {videoKey && (
                <iframe
                    className={styles["details-container__trailer"]}
                    title="movie-video"
                    width="70%"
                    height="500"
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            )}
            <div className={styles["details-container__overview"]}>
                {movieDetail.overview}
            </div>
            <h2 className={styles["related-title"]}>Related</h2>
            <Container className={styles["recommended-container"]}>
                <Row>
                    {recommendations.slice(0, 7).map((movie) => (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            key={movie.id}
                            className={styles["recommended-container__card"]}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    );
}
