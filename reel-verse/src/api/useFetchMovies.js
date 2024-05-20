
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export function useFetchMovies(url) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMovies(data.results));
    }, [url])
    
    return movies;
} 

export function handleAuthStateChange (onUserAuthenticated){
    return auth.onAuthStateChanged( (user) => {
        onUserAuthenticated(user);
    })
}
