import PopularMovieList from "./PopularMovieList";
import { useFetchMovies } from "../../api/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL } from "../../utils/constants";
import { useTranslation } from "react-i18next";

import styles from "./Popular.module.css"

export default function PopularMovieCardComponent() {
    const url = `${TMDB_API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US`;
    const popularMovies = useFetchMovies(url);
    const { t} = useTranslation(); 

    return (
        <div className={styles["popular-container"]}>
            <h2 className={styles["popular-container__title"]}>{t('POPULAR.POPULAR')}</h2>
            <PopularMovieList popularMovies={popularMovies} />
        </div>
    );
}
