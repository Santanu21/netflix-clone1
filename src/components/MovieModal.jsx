import { useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function MovieModal({ movie, onClose }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  if (!movie) return null;

  const handleTrailer = async () => {
    try {
      const url = await movieTrailer(
        movie.title || movie.name
      );

      if (!url) {
        alert("Trailer not found");
        return;
      }

      const urlParams = new URLSearchParams(
        new URL(url).search
      );

      setTrailerUrl(urlParams.get("v"));
    } catch (error) {
      alert("Trailer not found");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>{movie.title || movie.name}</h1>

        <p>
          <strong>Rating:</strong> {movie.vote_average}
        </p>

        <p>
          <strong>Release Date:</strong>{" "}
          {movie.release_date || movie.first_air_date}
        </p>

        <p>{movie.overview}</p>

        <button onClick={handleTrailer}>
          ▶ Watch Trailer
        </button>

        <button onClick={onClose}>
          Close
        </button>

        {trailerUrl && (
          <YouTube
            videoId={trailerUrl}
            opts={{
              width: "100%",
              height: window.innerWidth < 768 ? "220" : "400",
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MovieModal;