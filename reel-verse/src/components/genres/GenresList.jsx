/* eslint-disable react/prop-types */
import MovieCard from "../common/MovieCard/MovieCard";
import styles from "./GenresList.module.css";
import { Link } from "react-router-dom";

export default function GenresList(props) {
    const allGenres = props.genresList;
    console.log(allGenres);

    return (
        <div className={styles["genres-list-container"]}>
            {allGenres.map((movie) => (
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <MovieCard
                        title={movie.title}
                        image={movie.poster_path}
                        date={movie.release_date}
                        vote={movie.vote_average}
                    />
                </Link>
            ))}
        </div>
    );
}
