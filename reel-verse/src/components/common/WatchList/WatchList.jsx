import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDocs, query, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import { getUserCollectionRef, queryCollectionById} from "../../../firebase/firebase";
import {
    clearSnackbarTimer,
    setSnackbarTimer,
} from "../Snackbar/snackbarUtils";
import { handleAuthStateChange } from "../../../api/useFetchMovies";
import Snackbar from "../Snackbar/Snackbar";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./WatchList.module.css";
import Button from "../Button";


export default function WatchList() {
    const [watchlist, setWatchlist] = useState([]);
    const { t } = useTranslation();
    const [snackbar, setSnackbar] = useState(null);
    const [user, setUser] = useState(null);

    const fetchWatchlist = async (currentUser) => {
        if (currentUser) {
            try {
                const watchlistCollectionRef = getUserCollectionRef("watchlist");
                const querySnapshot = await getDocs(
                    query(watchlistCollectionRef)
                );
                const movieDetails = querySnapshot.docs.map((doc) =>
                    doc.data()
                );
                setWatchlist(movieDetails);
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
    },[])

    useEffect(() => {
        const unsubscribe = handleAuthStateChange(async (currentUser) => {
            setUser(currentUser);
            await fetchWatchlist(currentUser);
        });
        return () => unsubscribe();
    }, [])
    
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
            const watchlistCollectionRef = getUserCollectionRef("watchlist")
            const querySnapshot = await queryCollectionById(watchlistCollectionRef, id)

            for (const doc of querySnapshot.docs) {
                await deleteDoc(doc.ref);
                setSnackbar({
                    message: "Movie deleted successfully!",
                    status: "removed",
                });
                setSnackbarTimer(() => setSnackbar(null), 3000);
            }
            fetchWatchlist(user);
        } catch (error) {
             setSnackbar({ message: "Error deleting movie!", status: "error" });
             setSnackbarTimer(() => setSnackbar(null), 3000);
        }
    }

    return (
        <>
            {snackbar && (
                <Snackbar message={snackbar.message} status={snackbar.status} />
            )}
            <div className={styles["watchlist-container"]}>
                <h2 className={styles["watchlist-container__title"]}>
                    {t("WATCHLIST.TITLE")}
                </h2>
                <div className={styles["watchlist-list-container"]}>
                    {watchlist.map((movie) => (
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
