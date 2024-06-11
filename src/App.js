import { useState, useEffect, useCallback } from "react";
import MyBookShelfPage from "./pages/MyBookShelfPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [myBookShelf, SetMyBookShelf] = useState(() => {
    const saved = localStorage.getItem("myBookShelf");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  const fetchResults = useCallback(
    async (limit = 5, q = query) => {
      const formattedQuery = q.replace(/\s+/g, "+");
      if (q.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${formattedQuery}&limit=${limit}&page=1`
        );
        const data = await response.json();
        limit === 5 ? setResults(data.docs) : setSearchResults(data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const onSearch = async (q) => {
    setQuery(q);
    setLastQuery(q);
    fetchResults(10, q);
    setResults([]);
    setQuery("");
    navigate("/");
  };

  const addtoMyBookshelf = (book) => {
    const updatedShelf = [...myBookShelf, book];
    SetMyBookShelf(updatedShelf);
    localStorage.setItem("myBookShelf", JSON.stringify(updatedShelf));
  };

  const removeFromMyBookshelf = (book) => {
    const updatedShelf = myBookShelf.filter(
      (shelfBook) => shelfBook.isbn[0] !== book.isbn[0]
    );
    SetMyBookShelf(updatedShelf);
    localStorage.setItem("myBookShelf", JSON.stringify(updatedShelf));
  };

  useEffect(() => {
    localStorage.setItem("myBookShelf", JSON.stringify(myBookShelf));
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300); // Adjust debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [query, fetchResults, myBookShelf]);

  return (
    <Routes>
      <Route>
        <Route
          path="/"
          element={
            <HomePage
              query={query}
              setQuery={setQuery}
              loading={loading}
              results={results}
              setResults={setResults}
              onSearch={onSearch}
              searchResults={searchResults}
              myBookShelf={myBookShelf}
              addtoMyBookshelf={addtoMyBookshelf}
              removeFromMyBookshelf={removeFromMyBookshelf}
              lastQuery={lastQuery}
            />
          }
        />
        <Route
          path="/mybookshelf"
          element={
            <MyBookShelfPage
              query={query}
              setQuery={setQuery}
              loading={loading}
              results={results}
              setResults={setResults}
              onSearch={onSearch}
              searchResults={myBookShelf}
              myBookShelf={myBookShelf}
              addtoMyBookshelf={addtoMyBookshelf}
              removeFromMyBookshelf={removeFromMyBookshelf}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
