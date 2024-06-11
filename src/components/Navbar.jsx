import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

const Navbar = ({
  query,
  setQuery,
  loading,
  results,
  setResults,
  onSearch,
}) => {
  const navigate = useNavigate();
  return (
    <nav className="py-5 flex items-center px-1">
      <SearchBar
        query={query}
        setQuery={setQuery}
        loading={loading}
        results={results}
        setResults={setResults}
        onSearch={onSearch}
      />
      <button
        onClick={() => navigate("/mybookshelf")}
        className="flex-3 ml-1 text-l text-white bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        My Bookshelf
      </button>
    </nav>
  );
};

export default Navbar;
