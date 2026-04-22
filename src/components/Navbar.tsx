import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">📚 Library</h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/borrowed">Borrowed</Link>
        <Link to="/add">Add Book</Link>
      </div>
    </nav>
  );
};

export default Navbar;