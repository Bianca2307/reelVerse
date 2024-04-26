import UpcomingMovieList from "./UpcomingMovieList";
import { useFetchMovies } from "../../api/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL} from "../../utils/constants";
import { useTranslation } from "react-i18next";

import styles from "./UpcomingMovies.module.css";

export default function UpcomingMovieCardComponent() {
    const url = `${TMDB_API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`;
    const upcoming = useFetchMovies(url);
    const { t } = useTranslation();

    return (
        <div className={styles["upcoming-container"]}>
            <h2 className={styles["upcoming-container__title"]}>{t("upcoming.UPCOMING")}</h2>
            <UpcomingMovieList upcomingMovies={upcoming} />
        </div>
    );
}
