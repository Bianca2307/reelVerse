import TrendingMovieList from "./TrendingMovieList";
import { useFetchMovies } from "../../hooks/useFetchMovies";



export default function TrendingMovieCardComponent() {

    const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=d773193a88ede0c03b5da21759b8dea6&append_to_response=videos"
    const topRatedMovies = useFetchMovies(url)
    
  
    
    return (
        <div className="myContainer">
            <h2 className="title">Trending Movies</h2>
            {/* <div className="scroller"> */}
                <TrendingMovieList topRated={topRatedMovies } />
            {/* </div> */}
        </div>
    );
}