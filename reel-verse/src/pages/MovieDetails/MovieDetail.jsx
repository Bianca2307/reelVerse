import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteDoc, addDoc } from "firebase/firestore";
import Spinner from "react-bootstrap/Spinner";

import styles from "./MovieDetails.module.css";
import {
    TMDB_API_BASE_URL,
    API_KEY,
    BASE_IMAGE_URL,
} from "../../utils/constants";
import Button from "../../components/common/Button";
import {
    getUserFavoriteMoviesCollectionRef,
    queryFavoriteMoviesById,
} from "../../firebase/firebase";
import { handleAuthStateChange } from "../../api/useFetchMovies";

export default function MovieDetail() {
    const params = useParams();
    const [movieDetail, setMovieDetail] = useState({});
    const [videoKey, setVideoKey] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [isAddToFavorite, setIsAddToFavorite] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            try {
                const [movieData, recommendationsData] = await Promise.all([
                    fetch(
                        `${TMDB_API_BASE_URL}/movie/${params.id}?api_key=${API_KEY}&append_to_response=videos`
                    ).then((res) => res.json()),
                    fetch(
                        `${TMDB_API_BASE_URL}/movie/${params.id}/recommendations?api_key=${API_KEY}&append_to_response=videos`
                    ).then((res) => res.json()),
                ]);

                setMovieDetail(movieData);
                if (movieData.videos && movieData.videos.results.length > 0) {
                    setVideoKey(movieData.videos.results[0].key);
                }
                setRecommendations(recommendationsData.results);
            } catch (error) {
                alert(`An error for fetching data occurred: ${error.message}`)
            }
        };

        const fetchFavoriteMovies = async (user) => {
            if (user) {
                try {
                    const favoriteMoviesCollectionRef =
                        getUserFavoriteMoviesCollectionRef();
                        const querySnapshot = await queryFavoriteMoviesById(
                            favoriteMoviesCollectionRef,
                            params.id
                        );
                        const isFavorite = !querySnapshot.empty;
                        setIsAddToFavorite(isFavorite);
                    
                } catch (error) {
                    alert(`An error for fetching movies from firestore occurred: ${error.message}`)
                }
            } else {
                console.log("User not logged in ");
            }
        };

        const unsubscribe = handleAuthStateChange(
            async (user) => {
                await fetchFavoriteMovies(user)
                await fetchMoviesDetails(user);
            }
        )
        return () => unsubscribe();
    }, [params.id]);

    const handleAddToFavorite = async () => {
        setIsProcessing(true);
        if (isProcessing) return;
        try {
            const favoriteMoviesCollectionRef =
                getUserFavoriteMoviesCollectionRef();
            const querySnapshot = await queryFavoriteMoviesById(
                favoriteMoviesCollectionRef,
                params.id
            );

            if (isAddToFavorite) {
                for (const doc of querySnapshot.docs) {
                    await deleteDoc(doc.ref);
                }
                toast.error("Favorite movie deleted!");
            } else {
                await addDoc(favoriteMoviesCollectionRef, {
                    movieId: params.id,
                    title: movieDetail.title,
                    overview: movieDetail.overview,
                    poster_path: movieDetail.poster_path,
                    release_date: movieDetail.release_date,
                    vote_average: movieDetail.vote_average,
                    videoKey: videoKey,
                    state: true,
                });
                toast.success("Movie added successfully!");
            }
            setIsAddToFavorite((previousAddToFavorite) => !previousAddToFavorite);
        } catch (error) {
            alert(`Error updating favorite movies: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

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
                    {movieDetail && movieDetail.overview}
                </div>
                {isProcessing ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <Button
                        type="icon"
                        disabled={isProcessing}
                        icon={
                            isAddToFavorite ? (
                                <MdOutlineFavorite />
                            ) : (
                                <MdFavoriteBorder />
                            )
                        }
                        className={styles["favorite-icon"]}
                        onClick={handleAddToFavorite}
                    />
                )}

                <h2 className={styles["related-title"]}>Related</h2>
                <Container className={styles["recommended-container"]}>
                    <Row>
                        {recommendations &&
                            recommendations
                                .slice(0, 6)
                                .map((movie) => (
                                    <img
                                        src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                                        key={movie.id}
                                        className={
                                            styles[
                                                "recommended-container__card"
                                            ]
                                        }
                                    />
                                ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}
