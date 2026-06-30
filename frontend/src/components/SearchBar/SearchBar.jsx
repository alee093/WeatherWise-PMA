function SearchBar() {
    return (
        <section>
            <input
                type="text"
                placeholder="Search city..."
            />

            <button>Search</button>

            <button>📍 My Location</button>
        </section>
    );
}

export default SearchBar;