/* eslint-disable react/prop-types */
import MovieCard from "../common/MovieCard/MovieCard";
import styles from "./SearchMovies.module.css"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function SearchMoviesList(props) {
    const { t } = useTranslation();

    return (
        <div className={styles["search-container"]}>
            <h2 className={styles["search-container__title"]}>
                {t("SEARCHED.SEARCHED")}
            </h2>
            <div className={styles["search-list-container"]}>
                {props.searchedMovies.map((movie) => (
                    <Link to={`/movies/${movie.id}`} key={movie.id}>
                        <MovieCard
                            title={movie.title}
                            image={movie.poster_path}
                            date={movie.release_date}
                            vote={movie.vote_average}
                            key={movie.id}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
