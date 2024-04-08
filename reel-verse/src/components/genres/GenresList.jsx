/* eslint-disable react/prop-types */

import MovieCard from "../common/MovieCard";

export default function GenresList(props) {
    const allGenres = props.genresList;
    console.log(allGenres);

    return (
        <div className="container">
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
