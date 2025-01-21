import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/Card"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        if (type === "favorites") {
            // Fetch data from localStorage if type is "favorites"
            const savedFavorites = localStorage.getItem("favorites");
            const favoriteMovies = savedFavorites ? JSON.parse(savedFavorites) : [];
            setMovieList(favoriteMovies);
        } else {
            // Fetch data from TMDB API for other types
            fetch(
                `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
            )
                .then((res) => res.json())
                .then((data) => setMovieList(data.results));
        }
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList