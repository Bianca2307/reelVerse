import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import styles from "./MovieDetails.module.css"
import { TMDB_API_BASE_URL,API_KEY, BASE_IMAGE_URL } from "../../utils/constants";

export default function MovieDetail() {
    const params = useParams();
    console.log(params);
    const [movieDetail, setMovieDetail] = useState({});
    const [videoKey, setVideoKey] = useState("");
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch(
                `${TMDB_API_BASE_URL}/movie/${params.id}?api_key=${API_KEY}&append_to_response=videos`
            ).then((res) => res.json()),
            fetch(
                `${TMDB_API_BASE_URL}/movie/${params.id}/recommendations?api_key=${API_KEY}&append_to_response=videos`
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
            });
    }, []);

    return (
        <div>
            {/* <Link to=".." relative="path" className={styles["back-button"]}>
                &larr; <span>Back to movies</span>
            </Link> */}
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
                        {recommendations.slice(0, 6).map((movie) => (
                            <img
                                src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                                key={movie.id}
                                className={
                                    styles["recommended-container__card"]
                                }
                            />
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}
