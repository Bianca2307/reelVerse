import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
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
import Snackbar from "../../components/common/Snackbar/Snackbar";
import { setSnackbarTimer } from "../../components/common/Snackbar/snackbarUtils";


export default function MovieDetail() {
    const params = useParams();
    const [movieDetail, setMovieDetail] = useState({});
    const [videoKey, setVideoKey] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [isAddToFavorite, setIsAddToFavorite] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [snackbar, setSnackbar] = useState(null);

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
                setSnackbar({
                    message: "An error for fetching data occured!",
                    status: "error",
                });
                setSnackbarTimer(() => setSnackbar(null), 3000);
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
                    console.log(error);
                }
            } else {
                console.log("User not logged in ");
            }
        };

        const unsubscribe = handleAuthStateChange(async (user) => {
            await fetchFavoriteMovies(user);
            await fetchMoviesDetails(user);
        });
        return () => unsubscribe();
    }, [params.id]);

    useEffect(() => {
        return () => setSnackbar(null);
    }, []);

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
                setSnackbar({
                    message: "Movie deleted from favorites!",
                    status: "removed",
                });
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
                setSnackbar({
                    message: "Movie added to favorites successfully!",
                    status: "success",
                });
            }
            setSnackbarTimer(() => setSnackbar(null), 3000);
            setIsAddToFavorite(
                (previousAddToFavorite) => !previousAddToFavorite
            );
        } catch (error) {
            setSnackbar({ message: "Error updating favorite movie", status: "error" });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            {snackbar && (
                <Snackbar message={snackbar.message} status={snackbar.status} />
            )}
            <div className={styles["details-container"]}>
                <div className={styles["details-container__content"]}>
                    <div className="details-container__video">
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
                        <div className={styles["details-container__header"]}>
                            <div className={styles["details-title"]}>
                                {movieDetail.title}
                            </div>
                            {isProcessing ? (
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
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
                        </div>
                    </div>

                    <div className={styles["details-container__wrapper"]}>
                        <div className={styles["poster"]}>
                            <img
                                src={`${BASE_IMAGE_URL}${movieDetail.poster_path}`}
                                alt=""
                            />
                        </div>
                        <div className={styles["details-grid"]}>
                            <div
                                className={
                                    styles["overview"]
                                }
                            >
                                {movieDetail && (
                                    <p className={styles["label"]}>
                                        {movieDetail.overview}
                                    </p>
                                )}
                            </div>
                            <div
                                className={styles["rating"]}
                            >
                                <i className={styles["mh-icon"]}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M13.7299 3.51L15.4899 7.03C15.7299 7.52 16.3699 7.99 16.9099 8.08L20.0999 8.61C22.1399 8.95 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95 3.89991 8.61L7.08991 8.08C7.61991 7.99 8.25991 7.52 8.49991 7.03L10.2599 3.51C11.2199 1.6 12.7799 1.6 13.7299 3.51Z"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </i>
                                {movieDetail.vote_average}
                            </div>
                            <div>
                                <p className={styles["release_date"]}>
                                    Release date
                                </p>
                                <p className={styles["date"]}>
                                    {movieDetail.release_date}
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2 className={styles["related-title"]}>Related Movies</h2>
                    <Container className={styles["recommended-container"]}>
                        <Row>
                            {recommendations &&
                                recommendations.slice(0, 5).map((movie) => (
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
        </div>
    );
}
