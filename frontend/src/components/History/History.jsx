import { useEffect, useState } from "react";
import axios from "axios";

function History({ refreshTrigger }) {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/history");
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const exportJSON = () => {
    const dataStr = JSON.stringify(history, null, 2);

    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "weather-history.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!history.length) return;

    const headers = ["id", "city", "country", "temperature"];

    const rows = history.map(item =>
      [item.id, item.city, item.country, item.temperature].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "weather-history.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/history/${id}`);
      fetchHistory(); // refrescar lista
    } catch (error) {
      console.error(error);
    }
  };

  if (!history.length) {
    return (
      <section>
        <h2>History</h2>
        <p>No searches yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Search History</h2>

      <ul>
        {history.map((item) => (
          <li key={item.id}>
            <strong>{item.city}</strong> - {item.country} ({item.temperature}°C)

            <button onClick={() => handleDelete(item.id)}>
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={exportJSON}>Export JSON</button>
        <button onClick={exportCSV}>Export CSV</button>
      </div>
    </section>
  );
}

export default History;