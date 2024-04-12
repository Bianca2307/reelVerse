/* eslint-disable react/prop-types */
import MovieCard from "../common/MovieCard";
import { Link } from "react-router-dom";

export default function TrendingMovieList(props) {
   
    return (
        <div className="container">
            {props.topRated.map((movie) => (
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