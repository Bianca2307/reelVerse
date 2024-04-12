import NowPlayingMovieList from "./NowPlayingMovieList";
import { useFetchMovies } from "../../utils/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL, now_playing } from "../../utils/constants";

export default function NowPlayingCardComponent() {
    const url = `${TMDB_API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
    const playing = useFetchMovies(url);

    

    return (
        <div className="myContainer">
            <h2 className="title">{now_playing }</h2>
            <NowPlayingMovieList nowPlayingMovies={playing} />
        </div>
    )
}
