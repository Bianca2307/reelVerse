/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import MovieCard from "../common/MovieCard/MovieCard"
import styles from "./NowPlaying.module.css"

export default function NowPlayingMovieList(props) {
    const nowPlayingMovies = props.nowPlayingMovies

    return (
        <div className={styles["now-playing-list-container"]}>
            {nowPlayingMovies.map((movie) => (
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