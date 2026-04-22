import { useEffect, useState } from "react";
import API from "../services/api";
import "./Borrowed.css";

const Borrowed = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get("borrowed/")
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleReturn = (id: number) => {
    API.post("return/", { borrow_id: id }).then(() => {
      setRecords((prev: any) =>
        prev.filter((r: any) => r.id !== id)
      );
    });
  };

  return (
    <div className="borrowed-page">
      <h1 className="borrowed-title">Borrowed Books</h1>

      {records.length === 0 ? (
        <p className="empty-text">No borrowed books 📚</p>
      ) : (
        <div className="borrowed-grid">
          {records.map((record: any) => {
            const today = new Date();
            const dueDate = new Date(record.due_date);

            const isOverdue = today > dueDate;

            const diffTime =
              today.getTime() - dueDate.getTime();

            const lateDays = Math.max(
              0,
              Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            );

            const fine = lateDays * 10;

            return (
              <div
                key={record.id}
                className={`borrow-card ${
                  isOverdue ? "overdue" : ""
                }`}
              >
                <h2 className="book-name">{record.book}</h2>
                <p className="user-name">
                  User: {record.user}
                </p>

                <p className="due-date">
                  Due: {dueDate.toDateString()}
                </p>

                <span
                  className={`status ${
                    isOverdue ? "late" : "active"
                  }`}
                >
                  {isOverdue ? "Overdue" : "Active"}
                </span>

                {isOverdue && (
                  <p className="fine">Fine: ₹{fine}</p>
                )}

                <button
                  className="return-btn"
                  onClick={() => handleReturn(record.id)}
                >
                  Return Book
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Borrowed;