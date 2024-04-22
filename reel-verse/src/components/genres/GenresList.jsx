/* eslint-disable react/prop-types */
import MovieCard from "../common/MovieCard/MovieCard";
import styles from "./GenresList.module.css";

export default function GenresList(props) {
    const allGenres = props.genresList;
    console.log(allGenres);

    return (
        <div className={styles["genres-list-container"]}>
            {allGenres.map((movie) => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    image={movie.poster_path}
                    date={movie.release_date}
                    vote={movie.vote_average}
                />
            ))}
        </div>
    );
}
