import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Remove a movie from favorites
    const removeFromFavorites = (movieId) => {
        const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites">
            <h1>Your Favorite Movies</h1>
            {favorites.length === 0 ? (
                <p className="favorites__empty">No favorites yet.</p>
            ) : (
                <div className="favorites__list">
                    {favorites.map((movie) => (
                        <div className="favorites__card" key={movie.id}>
                            <Link to={`/movie/${movie.id}`} className="favorites__link">
                                <img 
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                                    alt={movie.original_title} 
                                    className="favorites__img" 
                                />
                                <h3 className="favorites__title">{movie.original_title}</h3>
                            </Link>
                            <button 
                                className="favorites__remove-btn" 
                                onClick={() => removeFromFavorites(movie.id)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
