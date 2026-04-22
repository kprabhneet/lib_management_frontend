import { useEffect, useState } from "react";
import API from "../services/api";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleBorrow = (bookId: number) => {
    API.post("borrow/", {
      user: 1,
      book: bookId,
    }).then(() => {
      setBooks((prev: any) =>
        prev.map((b: any) =>
          b.id === bookId
            ? { ...b, available_copies: b.available_copies - 1 }
            : b
        )
      );
    });
  };

  // 🔍 filter books
  const filteredBooks = books.filter((book: any) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="books-page">
      <h1 className="title">Library</h1>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search books..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="books-grid">
        {filteredBooks.map((book: any) => {
          const title = book.title.toLowerCase();

          const image =
            title === "halfway to grave"
              ? "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
              : title === "atomic habits"
              ? "https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg"
              : title === "the maid"
              ? "https://m.media-amazon.com/images/I/81WojUxbbFL.jpg"
              : title === "the goldfinch"
              ? "https://m.media-amazon.com/images/I/81z4V7qXG1L.jpg"
              : title === "the subtle art of not giving fuck"
              ? "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg"
              : book.cover || "https://via.placeholder.com/150";

          return (
            <div key={book.id} className="book-card">
              <div className="image-container">
                <img src={image} alt={book.title} />
              </div>

              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>Available: {book.available_copies}</p>

              <button
                disabled={book.available_copies === 0}
                onClick={() => handleBorrow(book.id)}
              >
                {book.available_copies === 0
                  ? "Not Available"
                  : "Borrow"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Books;