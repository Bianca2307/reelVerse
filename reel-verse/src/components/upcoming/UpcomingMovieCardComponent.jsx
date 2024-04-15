import UpcomingMovieList from "./UpcomingMovieList";
import { useFetchMovies } from "../../api/useFetchMovies";
import { API_KEY, TMDB_API_BASE_URL} from "../../utils/constants";
import { useTranslation } from "react-i18next";


export default function UpcomingMovieCardComponent() {
    const url = `${TMDB_API_BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`;
    const upcoming = useFetchMovies(url);
    const { t } = useTranslation();

  
    return (
        <div className="myContainer">
            <h2 className="title">{t('upcoming')}</h2>
            <UpcomingMovieList upcomingMovies={upcoming } />
    
        </div>
    );
}
