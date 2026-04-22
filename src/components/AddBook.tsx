import { useState } from "react";
import axios from "axios";

type Props = {
  onBookAdded: () => void;
};

function AddBook({ onBookAdded }: Props) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const handleSubmit = () => {
    axios
      .post("http://127.0.0.1:8000/api/books/", {
        title: title,
        author: author,
        isbn: "12345",
        total_copies: 5,
        available_copies: 5,
      })
      .then((res) => {
        console.log(res.data);
        alert("Book added ✅");

        // 🔥 Refresh book list
        onBookAdded();

        // clear fields
        setTitle("");
        setAuthor("");
      })
      .catch((err) => {
        console.error(err);
        alert("Error ❌");
      });
  };

  return (
    <div>
      <h2>➕ Add Book</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
}

export default AddBook;