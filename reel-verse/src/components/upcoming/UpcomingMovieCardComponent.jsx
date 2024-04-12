import UpcomingMovieList from "./UpcomingMovieList";
import { useFetchMovies } from "../../utils/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL,upcoming_movies } from "../../utils/constants";


export default function UpcomingMovieCardComponent() {
    const url = `${TMDB_API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`;
    const upcoming = useFetchMovies(url);

  
    return (
        <div className="myContainer">
            <h2 className="title">{upcoming_movies }</h2>
            <UpcomingMovieList upcomingMovies={upcoming } />
    
        </div>
        
    )
}
