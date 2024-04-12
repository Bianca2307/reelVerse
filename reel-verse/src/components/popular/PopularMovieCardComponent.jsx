import PopularMovieList from "./PopularMovieList";
import { useFetchMovies } from "../../utils/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL, popular_movies} from "../../utils/constants";

export default function PopularMovieCardComponent() {
    const url = `${TMDB_API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US`;
    const popularMovies = useFetchMovies(url);

    return (
        <div className="myContainer">
            <h2 className="title">{popular_movies}</h2>
            <PopularMovieList popularMovies={popularMovies} />
        </div>
    );
}
