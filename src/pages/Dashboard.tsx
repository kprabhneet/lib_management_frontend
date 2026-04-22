import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState([]);

  useEffect(() => {
    API.get("books/").then((res) => setBooks(res.data));
    API.get("borrowed/").then((res) => setBorrowed(res.data));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats">
        <div className="card"> Total Books: {books.length}</div>
        <div className="card">📖 Books Borrowed: {borrowed.length}</div>
      </div>
    </div>
  );
};

export default Dashboard;