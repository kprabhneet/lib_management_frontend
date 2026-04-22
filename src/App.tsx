import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// ✅ VERY IMPORTANT — check paths carefully
import Books from "./pages/Books";
import Borrowed from "./pages/Borrowed";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/borrowed" element={<Borrowed />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;