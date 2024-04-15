import TrendingMovieList from "./TrendingMovieList";
import { useFetchMovies } from "../../api/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL} from "../../utils/constants";
import { useTranslation } from "react-i18next";

export default function TrendingMovieCardComponent() {

    const url = `${TMDB_API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&append_to_response=videos`
    const topRatedMovies = useFetchMovies(url)
    const { t } = useTranslation();
    
    return (
        <div className="myContainer">
            <h2 className="title">{t("trendingTitle")}</h2>
            <TrendingMovieList topRated={topRatedMovies} />
        </div>
    );
}

