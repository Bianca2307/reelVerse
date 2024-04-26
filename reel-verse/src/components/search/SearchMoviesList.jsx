/* eslint-disable react/prop-types */
import MovieCard from "../common/MovieCard/MovieCard";
import styles from "./SearchMovies.module.css"
import { useTranslation } from "react-i18next";

export default function SearchMoviesList(props) {
    const { t } = useTranslation();

    return (
        <div className={styles["search-container"]}>
            <h2 className={styles["search-container__title"]}>{t("searched.SEARCHED")}</h2>
            <div className={styles["search-list-container"]}>
                {props.searchedMovies.map((movie) => (
                    <MovieCard
                        title={movie.title}
                        image={movie.poster_path}
                        date={movie.release_date}
                        vote={movie.vote_average}
                        key={movie.id}
                    />
                ))}
            </div>
        </div>
    );
}
