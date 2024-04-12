import TrendingMovieList from "./TrendingMovieList";
import { useFetchMovies } from "../../utils/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL, trending_movies } from "../../utils/constants";



export default function TrendingMovieCardComponent() {

    const url = `${TMDB_API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&append_to_response=videos`
    const topRatedMovies = useFetchMovies(url)
    
  
    
    return (
        <div className="myContainer">
            <h2 className="title">{trending_movies }</h2>
            {/* <div className="scroller"> */}
                <TrendingMovieList topRated={topRatedMovies } />
            {/* </div> */}
        </div>
    );
}