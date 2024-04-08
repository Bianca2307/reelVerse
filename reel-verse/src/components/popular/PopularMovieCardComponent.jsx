import PopularMovieList from "./PopularMovieList";
import { useFetchMovies } from "../../hooks/useFetchMovies";

export default function PopularMovieCardComponent() {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=d773193a88ede0c03b5da21759b8dea6&language=en-US";
    const popularMovies = useFetchMovies(url);

    return (
        <div className="myContainer">
            <h2 className="title">Popular Movies</h2>
            <PopularMovieList popularMovies={popularMovies} />
        </div>
    );
}
