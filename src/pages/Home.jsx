import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../services/requests";
import SearchBar from "../components/SearchBar";

  

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [bannerMovie, setBannerMovie] = useState(null);

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      );

      setMovies(res.data.results);

      const randomMovie =
        res.data.results[
          Math.floor(
            Math.random() * res.data.results.length
          )
        ];

      setBannerMovie(randomMovie);

    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, []);

   

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);

useEffect(() => {
  if (!debouncedSearchTerm) {
    setSearchResults([]);
    return;
  }

  const searchMovies = async () => {
    try {
      const res = await api.get(
        `/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${debouncedSearchTerm}`
      );

      setSearchResults(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  searchMovies();
}, [debouncedSearchTerm]);

return (
  <>
    <Navbar />
    
    {loading && (
  <div className="loading">
    Loading movies...
  </div>
)}

{error && (
  <div className="error">
    {error}
  </div>
)}
    
    <div className="main-content">
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />

  <Banner movie={bannerMovie} />
  </div>

{searchResults.length > 0 ? (
  <>
    <h2>Search Results</h2>

    <div className="movie-row">
      {searchResults.map((movie) => (
        <img
          key={movie.id}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width="200"
        />
      ))}
    </div>
  </>
) : (
  <>
    <Row title="Trending Now" fetchUrl={requests.trending} />
    <Row title="Top Rated" fetchUrl={requests.topRated} />
    <Row title="Action Movies" fetchUrl={requests.action} />
    <Row title="Comedy Movies" fetchUrl={requests.comedy} />
    <Row title="Horror Movies" fetchUrl={requests.horror} />
  </>
  
)}  
</>
);
}

export default Home;