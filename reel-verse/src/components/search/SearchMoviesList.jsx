/* eslint-disable react/prop-types */
import MovieCard from "../common/MovieCard";

export default function SearchMoviesList(props) {
    return (
        <div className="myContainer">
            <h2 className="title">Searched movies</h2>
            <div className="container">
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
