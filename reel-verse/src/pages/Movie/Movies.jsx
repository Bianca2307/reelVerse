import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { API_KEY, TMDB_API_BASE_URL } from "../../utils/constants";
import { useTranslation } from "react-i18next";

import PopularMovieCardComponent from "../../components/popular/PopularMovieCardComponent";
import TrendingMovieCardComponent from "../../components/trending/TrendingMovieCardComponent";
import UpcomingMovieCardComponent from "../../components/upcoming/UpcomingMovieCardComponent";
import NowPlayingCardComponent from "../../components/nowPlaying/NowPlayingCardComponent";
import GenresList from "../../components/genres/GenresList";
import SearchMoviesList from "../../components/search/SearchMoviesList";
import user from "../../assets/user.png";
import Button from "../../components/common/Button";
import style from "./Movie.module.css";

export default function Movies() {
    const [activeCategory, setActiveCategory] = useState("");
    const [expandButtonClicked, setExpandButtonClicked] = useState(false);
    const [restrictButtonClicked, setRestrictButtonClicked] = useState(false);
    const [genres, setGenres] = useState([]);
    const [showGenres, setShowGenres] = useState(false);
    const [activeGenre, setActiveGenre] = useState(null);
    const [formData, setFormData] = useSearchParams();
    const query = formData.get("query");
    const [searchMovies, setSearchMovies] = useState([]);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const genreCategories = [
        { id: 16, label: t("movies.ANIMATION") },
        { id: 35, label: t("movies.COMEDY") },
        { id: 80, label: t("movies.CRIME") },
        { id: 99, label: t("movies.DOCUMENTARY") },
        { id: 18, label: t("movies.DRAMA") },
        { id: 10751, label: t("movies.FAMILY") },
        { id: 14, label: t("movies.FANTASY") },
        { id: 36, label: t("movies.HISTORY") },
        { id: 27, label: t("movies.HORROR") },
        { id: 10402, label: t("movies.MUSIC") },
        { id: 9648, label: t("movies.MISTERY") },
        { id: 10749, label: t("movies.ROMANCE") },
        { id: 878, label: t("movies.SCIENCE") },
        { id: 10770, label: t("movies.TV") },
        { id: 53, label: t("movies.THRILLER") },
        { id: 10752, label: t("movies.WAR") },
    ];

    const styles = {
        visibility: expandButtonClicked ? "hidden" : "visible",
    };

    async function fetchGenres(id) {
        const res = await fetch(
            `${TMDB_API_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}`
        );
        const data = await res.json();
        setGenres(data.results);
        setShowGenres(true);
    }

    const handleGenreClick = (id) => {
        if (activeGenre === id) {
            setActiveGenre(null);
        } else {
            setActiveGenre(id);
            fetchGenres(id);
            setActiveCategory("");
        }
    };

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));

        setActiveCategory("search");
        setShowGenres(false);
    }

    async function fetchSearch() {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );
        const data = await res.json();
        setSearchMovies(data.results);
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetchSearch();
        formData.query = "";
        formData.query = "";
        navigate(".");
    }

    return (
        <>
            <div className={style["movies-container"]}>
                <section className={`${style.new_index} ${style.background_8}`}>
                    <div className={`${style.media} ${style.discover}`}>
                        <div className={style["column_wrapper"]}>
                            <div
                                className={`${style.content_wrapper} ${style.wrap}`}
                            >
                                <div className={style["title"]}>
                                    <h2>{t("movies.WELCOME")}</h2>
                                    <h3>{t("movies.EXPLORE")}</h3>
                                </div>
                                <div className={style["search"]}>
                                    <form className={style["search-movies"]}>
                                        <input
                                            className={
                                                style["search-movies--input"]
                                            }
                                            type="text"
                                            placeholder="Search"
                                            name="query"
                                            value={formData.query}
                                            onChange={handleChange}
                                        />
                                        <button onClick={handleSubmit}>
                                            {t("movies.SEARCH")}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className={style["filter-container"]}>
                    <Button
                        theme="light"
                        type="text"
                        onClick={() => {
                            handleGenreClick(28);
                        }}
                        style={{
                            backgroundColor:
                                activeGenre === 28 ? "white" : "#1a2237",
                            color: activeGenre === 28 ? "black" : "white",
                        }}
                    >
                        {t("movies.ACTION")}
                    </Button>
                    <Button
                        theme="light"
                        type="text"
                        onClick={() => {
                            handleGenreClick(12);
                        }}
                        style={{
                            backgroundColor:
                                activeGenre === 12 ? "white" : "#1a2237",
                            color: activeGenre === 12 ? "black" : "white",
                        }}
                    >
                        {t("movies.ADVENTURE")}
                    </Button>

                    {expandButtonClicked && !restrictButtonClicked && (
                        <>
                            {genreCategories.map((category) => (
                                <Button
                                    key={category.id}
                                    theme="light"
                                    type="text"
                                    onClick={() => {
                                        handleGenreClick(category.id);
                                    }}
                                    style={{
                                        backgroundColor:
                                            activeGenre === category.id
                                                ? "white"
                                                : "#1a2237",
                                        color:
                                            activeGenre === category.id
                                                ? "black"
                                                : "white",
                                    }}
                                >
                                    {category.label}
                                </Button>
                            ))}
                            <Button
                                theme="transparent"
                                type="icon"
                                icon={
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M18 6h2v12h-2zm-2 5H7.414l4.293-4.293-1.414-1.414L3.586 12l6.707 6.707 1.414-1.414L7.414 13H16z"></path>
                                    </svg>
                                }
                                onClick={() => {
                                    setRestrictButtonClicked(true);
                                    setExpandButtonClicked(false);
                                }}
                            ></Button>
                        </>
                    )}
                    <Button
                        theme="transparent"
                        type="icon"
                        icon={
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                            </svg>
                        }
                        onClick={() => {
                            setExpandButtonClicked(true);
                            setRestrictButtonClicked(false);
                        }}
                        style={styles}
                    ></Button>
                </div>
                {showGenres && <GenresList genresList={genres} />}
            </div>
            <div className={style["panel"]}>
                <div>
                    {" "}
                    <svg
                        onClick={() => {
                            setActiveCategory("popular");
                            setShowGenres(false);
                            setActiveGenre(false);
                        }}
                        style={{
                            color:
                                activeCategory === "popular"
                                    ? " #fff"
                                    : "#546487",
                        }}
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M10 11l-.94 2.06L7 14l2.06.94L10 17l.94-2.06L13 14l-2.06-.94zm8.01-7l2 4h-3l-2-4h-2l2 4h-3l-2-4h-2l2 4h-3l-2-4h-1c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 1.99-.9 1.99-2V4h-3.99zm2 14h-16V6.47L5.77 10H16l-.63 1.37L14 12l1.37.63L16 14l.63-1.37L18 12l-1.37-.63L16 10h4.01v8z"></path>
                    </svg>
                    <svg
                        onClick={() => {
                            setActiveCategory("playing");
                            setShowGenres(false);
                            setActiveGenre(false);
                        }}
                        style={{
                            color:
                                activeCategory === "playing"
                                    ? " #fff"
                                    : "#546487",
                        }}
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM9.536 9 6.869 5h2.596l2.667 4H9.536zm5 0-2.667-4h2.596l2.667 4h-2.596zM4 5h.465l2.667 4H4V5zm0 14v-8h16l.002 8H4z"></path>
                        <path d="m10 18 5.5-3-5.5-3z"></path>
                    </svg>
                    <svg
                        onClick={() => {
                            setActiveCategory("trending");
                            setShowGenres(false);
                            setActiveGenre(false);
                        }}
                        style={{
                            color:
                                activeCategory === "trending"
                                    ? "#fff"
                                    : "#546487",
                        }}
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"></path>
                    </svg>
                    <svg
                        onClick={() => {
                            setActiveCategory("upcoming");
                            setShowGenres(false);
                            setActiveGenre(false);
                        }}
                        style={{
                            color:
                                activeCategory === "upcoming"
                                    ? " #fff"
                                    : "#546487",
                        }}
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M18 11c0-.959-.68-1.761-1.581-1.954C16.779 8.445 17 7.75 17 7c0-2.206-1.794-4-4-4-1.517 0-2.821.857-3.5 2.104C8.821 3.857 7.517 3 6 3 3.794 3 2 4.794 2 7c0 .902.312 1.727.817 2.396A1.994 1.994 0 0 0 2 11v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-2.638l4 2v-7l-4 2V11zm-5-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM4 19v-8h12l.002 8H4z"></path>
                    </svg>
                    <div className={style["user-account"]}>
                        <Link to="/profile">
                            <img src={user} />
                        </Link>
                    </div>
                </div>
            </div>

            {activeCategory === "popular" && <PopularMovieCardComponent />}
            {activeCategory === "playing" && <TrendingMovieCardComponent />}
            {activeCategory === "trending" && <UpcomingMovieCardComponent />}
            {activeCategory === "upcoming" && <NowPlayingCardComponent />}

            {activeCategory === "search" && (
                <SearchMoviesList searchedMovies={searchMovies} />
            )}
        </>
    );
}
