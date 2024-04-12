
import { useEffect, useState } from "react";

export function useFetchMovies(url) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMovies(data.results));
    }, [url])
    
    return movies;
} 

