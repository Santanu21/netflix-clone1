function Banner({ movie }) {
  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="banner-content">
        <h1>{movie.title}</h1>

        <div className="banner-buttons">
          <button>▶ Play</button>
          <button>ℹ More Info</button>
        </div>

        <p>{movie.overview}</p>
      </div>
    </header>
  );
}

export default Banner;