import NowPlayingMovieList from "./NowPlayingMovieList";
import { useFetchMovies } from "../../hooks/useFetchMovies";

export default function NowPlayingCardComponent() {
    const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=d773193a88ede0c03b5da21759b8dea6&language=en-US"
    const playing = useFetchMovies(url);

    

    return (
        <div className="myContainer">
            <h2 className="title">Now Playing</h2>
            <NowPlayingMovieList nowPlayingMovies={playing} />
        </div>
    )
}
