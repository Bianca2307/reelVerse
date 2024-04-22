import TrendingMovieList from "./TrendingMovieList";
import { useFetchMovies } from "../../api/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL} from "../../utils/constants";
import { useTranslation } from "react-i18next";

import styles from "./TrendingMovies.module.css"

export default function TrendingMovieCardComponent() {
    const url = `${TMDB_API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&append_to_response=videos`
    const topRatedMovies = useFetchMovies(url)
    const { t } = useTranslation();
    
    return (
        <div className={styles["trending-container"]}>
            <h2 className={styles["trending-container__title"]}>{t("trending.TRENDING")}</h2>
            <TrendingMovieList topRated={topRatedMovies} />
        </div>
    );
}

