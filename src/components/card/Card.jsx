import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the movie is already in favorites on component load
  useEffect(() => {
    if (movie) {
      const savedFavorites = localStorage.getItem("favorites");
      const favoriteMovies = savedFavorites ? JSON.parse(savedFavorites) : [];
      setIsFavorite(favoriteMovies.some((fav) => fav.id === movie.id));
    }
  }, [movie]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Add movie to favorites
  const updateFavorites = (updatedFavorites) => {
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites.some((fav) => fav.id === movie.id));
  };

  const addToFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    const favoriteMovies = savedFavorites ? JSON.parse(savedFavorites) : [];
    const updatedFavorites = [...favoriteMovies, movie];
    updateFavorites(updatedFavorites);
  };

  // Remove movie from favorites
  const removeFromFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    const favoriteMovies = savedFavorites ? JSON.parse(savedFavorites) : [];
    const updatedFavorites = favoriteMovies.filter((fav) => fav.id !== movie.id);
    updateFavorites(updatedFavorites);
  };

  return (
    <div className="cards-wrapper">
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <>
          <div className="cards-container">
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
              <div className="cards">
                <img
                  className="cards__img"
                  src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                  alt={movie?.original_title || "Movie Poster"}
                />
                <div className="cards__overlay">
                  <div className="card__title">{movie?.original_title || ""}</div>
                  <div className="card__runtime">
                    {movie?.release_date || ""}
                    <span className="card__rating">
                      {movie?.vote_average || ""}
                      <i className="fas fa-star" />
                    </span>
                  </div>
                  <div className="card__description">
                    {movie?.overview?.slice(0, 118) + "..." || ""}
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* Add/Remove Favorites Button */}
          <div className="favorite-btn-container">
            <button
              onClick={isFavorite ? removeFromFavorites : addToFavorites}
              className={`favorite-btn ${isFavorite ? "favorite-btn--active" : ""}`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
