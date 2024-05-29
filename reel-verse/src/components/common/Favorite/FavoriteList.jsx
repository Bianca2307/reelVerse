import { useEffect, useState } from "react";
import { getDocs, query, deleteDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import MovieCard from "../MovieCard/MovieCard";
import styles from "./Favorite.module.css";
import Button from "../Button";
import {
    getUserFavoriteMoviesCollectionRef,
    queryFavoriteMoviesById
} from "../../../firebase/firebase";
import { handleAuthStateChange } from "../../../api/useFetchMovies";

export default function FavoriteList() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const { t } = useTranslation();

    const fetchFavoriteMovies = async (user) => {
        if (user) {
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
                alert(`Error fetching favorite movies: ${error.message}`);
            }
        } else {
            console.log("User not logged in");
        }
    };

    useEffect(() => {
        const unsubscribe = handleAuthStateChange(
            async (user) => {
                await fetchFavoriteMovies(user)
            }
        )
        return () => unsubscribe()
    }, []);

    const deleteMovie = async (id) => {
        try {
            const favoriteMoviesCollectionRef =
                getUserFavoriteMoviesCollectionRef();
            const querySnapshot = await queryFavoriteMoviesById(
                favoriteMoviesCollectionRef,
                id
            );
            for (const doc of querySnapshot.docs) {
                await deleteDoc(doc.ref);
            }
            fetchFavoriteMovies();
        } catch (error) {
            alert(`Error deleting movie: ${error.message}`);
        }
    };
    return (
        <div className={styles["favorite-container"]}>
            <h2 className={styles["favorite-container__title"]}>
                {t("FAVORITE.TITLE")}
            </h2>
            <div className={styles["favorite-list-container"]}>
                {favoriteMovies.map((movie) => (
                    <Card key={movie.id} className={styles["card"]}>
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
                    </Card>
                ))}
            </div>
        </div>
    );
}
