import UpcomingMovieList from "./UpcomingMovieList";
import { useFetchMovies } from "../../hooks/useFetchMovies";


export default function UpcomingMovieCardComponent() {
    const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=d773193a88ede0c03b5da21759b8dea6&language=en-US";
    const upcoming = useFetchMovies(url);

  


    return (
        <div className="myContainer">
            <h2 className="title">Upcoming Movies</h2>
            <UpcomingMovieList upcomingMovies={upcoming } />
    
        </div>
        
    )
}
