function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ padding: "5px 5px" }}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    
  );
}

export default SearchBar;