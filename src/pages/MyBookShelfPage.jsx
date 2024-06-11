import React from "react";
import Navbar from "../components/Navbar";
import BookGrid from "../components/BookGrid";

const MyBookShelfPage = ({
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

        <h1 className="text-3xl p-3 font-bold">My Bookshelf</h1>

        <BookGrid
          searchResults={searchResults}
          myBookShelf={myBookShelf}
          addtoMyBookshelf={addtoMyBookshelf}
          removeFromMyBookshelf={removeFromMyBookshelf}
        />

        {myBookShelf.length === 0 && (
          <h1>Your Shelf is empty add some books</h1>
        )}
      </div>
    </div>
  );
};

export default MyBookShelfPage;
