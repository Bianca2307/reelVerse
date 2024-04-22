/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import MovieCard from "../common/MovieCard/MovieCard";
import styles from "./Popular.module.css"

export default function PopularMovieList(props) {
    const movies = props.popularMovies;
    return (
        <div className={styles["popular-list-container"]}>
            {movies.map((movie) => (
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <MovieCard
                        title={movie.title}
                        image={movie.poster_path}
                        date={movie.release_date}
                        vote = {movie.vote_average}
                    />
                </Link>
            ))}
        </div>
    );
}
