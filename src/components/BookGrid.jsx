import React from "react";

const BookGrid = ({
  searchResults,
  addtoMyBookshelf,
  myBookShelf,
  removeFromMyBookshelf,
}) => {
  const isBookInShelf = (book) => {
    return myBookShelf.some(
      (shelfBook) =>
        shelfBook.isbn &&
        shelfBook.isbn[0] &&
        book.isbn &&
        book.isbn[0] &&
        shelfBook.isbn[0] === book.isbn[0]
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-12  ">
      {searchResults.length > 0 &&
        searchResults.map((result, index) => (
          <div
            key={index}
            className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 col-span-4"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={`https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`}
              loading="lazy"
              alt="book cover"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {result.title}
              </h5>
              <p className="mb-3 font-normal text-gray-500 text-xm">
                by,{result.author_name}
              </p>
              <div>
                <span className="font-bold">Edition Count:</span>{" "}
                {result.edition_count}
              </div>
              <div className="">
                {!isBookInShelf(result) ? (
                  <button
                    className="mt-10 text-start  text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
                    onClick={(e) => {
                      addtoMyBookshelf(result);
                      e.preventDefault();
                    }}
                  >
                    Add to lists
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      removeFromMyBookshelf(result);
                      e.preventDefault();
                    }}
                    className="mt-10 text-start  text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookGrid;
