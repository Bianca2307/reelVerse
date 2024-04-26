import NowPlayingMovieList from "./NowPlayingMovieList";
import { useFetchMovies } from "../../api/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL} from "../../utils/constants";
import { useTranslation } from "react-i18next";

import styles from "./NowPlaying.module.css";

export default function NowPlayingCardComponent() {
    const url = `${TMDB_API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
    const playing = useFetchMovies(url);
    const { t } = useTranslation();

    return (
        <div className={styles["now-playing-container"]}>
            <h2 className={styles["now-playing-container__title"]}>{t("NOW_PLAYING.PLAYING")}</h2>
            <NowPlayingMovieList nowPlayingMovies={playing} />
        </div>
    );
}
