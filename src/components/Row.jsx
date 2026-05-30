import { useEffect, useState } from "react";
import api from "../services/api";
import MovieModal from "./MovieModal";


function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(fetchUrl);
      setMovies(res.data.results);
    };

    fetchData();
  }, [fetchUrl]);

  return (
    <div>
      <h2>{title}</h2>

      <div className="movie-row">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width="200"
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

    <MovieModal
      movie={selectedMovie}
      onClose={() => setSelectedMovie(null)}
    />
    </div>
  );
}

export default Row;