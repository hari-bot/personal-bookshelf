import React from "react";
import Navbar from "../components/Navbar";
import BookGrid from "../components/BookGrid";

const HomePage = ({
  query,
  setQuery,
  loading,
  results,
  setResults,
  onSearch,
  searchResults,
  myBookShelf,
  addtoMyBookshelf,
  removeFromMyBookshelf,
  lastQuery,
}) => {
  return (
    <div className="bg-[#f2f2f2]">
      <div className="container mx-auto min-h-screen">
        <Navbar
          query={query}
          setQuery={setQuery}
          loading={loading}
          results={results}
          setResults={setResults}
          onSearch={onSearch}
        />

        {lastQuery ? (
          <h1 className="text-3xl p-3 font-bold">
            Search results for "{lastQuery}"
          </h1>
        ) : (
          <h1 className="text-3xl p-3 font-bold">
            Search 📚, Add ➕, and Discover Your Personal Bookshelf! 🛠️
          </h1>
        )}
        <BookGrid
          searchResults={searchResults}
          myBookShelf={myBookShelf}
          addtoMyBookshelf={addtoMyBookshelf}
          removeFromMyBookshelf={removeFromMyBookshelf}
        />
      </div>
    </div>
  );
};

export default HomePage;
