import { useEffect, useState } from "react";
import { getDocs, query, deleteDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import MovieCard from "../MovieCard/MovieCard";
import styles from "./Favorite.module.css";
import Button from "../Button";
import {
    getUserFavoriteMoviesCollectionRef,
    queryFavoriteMoviesById,
} from "../../../firebase/firebase";
import { handleAuthStateChange } from "../../../api/useFetchMovies";
import Snackbar from "../Snackbar/Snackbar";
import {
    clearSnackbarTimer,
    setSnackbarTimer,
} from "../Snackbar/snackbarUtils";

export default function FavoriteList() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const { t } = useTranslation();
    const [snackbar, setSnackbar] = useState(null);
    const [user, setUser] = useState(null);

    const fetchFavoriteMovies = async (currentUser) => {
        if (currentUser) {
            try {
                const favoriteMoviesCollectionRef =
                    getUserFavoriteMoviesCollectionRef();
                const querySnapshot = await getDocs(
                    query(favoriteMoviesCollectionRef)
                );
                const movieDetails = querySnapshot.docs.map((doc) =>
                    doc.data()
                );
                setFavoriteMovies(movieDetails);
            } catch (error) {
                setSnackbar({
                    message: "Error displaying favorite movies!",
                    status: "error",
                });
                setSnackbarTimer(() => setSnackbar(null), 3000);
            }
        } else {
            console.log("User not logged in");
        }
    };

    useEffect(() => {
        return () => clearSnackbarTimer();
    }, []);

    useEffect(() => {
        const unsubscribe = handleAuthStateChange(async (currentUser) => {
            setUser(currentUser);
            await fetchFavoriteMovies(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const deleteMovie = async (id) => {
        if (!user) {
            setSnackbar({
                message: "You need to be logged in to perform this action!",
                status: "error",
            });

            setSnackbarTimer(() => setSnackbar(null), 3000);
            return;
        }

        try {
            const favoriteMoviesCollectionRef =
                getUserFavoriteMoviesCollectionRef();
            const querySnapshot = await queryFavoriteMoviesById(
                favoriteMoviesCollectionRef,
                id
            );
            for (const doc of querySnapshot.docs) {
                await deleteDoc(doc.ref);
                setSnackbar({
                    message: "Movie deleted successfully!",
                    status: "removed",
                });
                setSnackbarTimer(() => setSnackbar(null), 3000);
            }
            fetchFavoriteMovies(user);
        } catch (error) {
            setSnackbar({ message: "Error deleting movie!", status: "error" });
            setSnackbarTimer(() => setSnackbar(null), 3000);
        }
    };
    return (
        <>
            {snackbar && (
                <Snackbar message={snackbar.message} status={snackbar.status} />
            )}
            <div className={styles["favorite-container"]}>
                <h2 className={styles["favorite-container__title"]}>
                    {t("FAVORITE.TITLE")}
                </h2>
                <div className={styles["favorite-list-container"]}>
                    {favoriteMovies.map((movie) => (
                        <div key={movie.id}>
                            <Link to={`/movies/${movie.movieId}`}>
                                <MovieCard
                                    title={movie.title}
                                    image={movie.poster_path}
                                    date={movie.release_date}
                                    vote={movie.vote_average}
                                />
                            </Link>
                            <Button
                                type="text"
                                theme="danger"
                                className={styles["delete-button"]}
                                onClick={() => deleteMovie(movie.movieId)}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
