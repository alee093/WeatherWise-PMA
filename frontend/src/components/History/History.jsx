import { useEffect, useState } from "react";
import { getHistory, deleteHistory } from "../../services/api";
import "./History.css";
import { formatHistoryDate } from "../../utils/dateUtils";

function History({ refresh, onSelectCity }) {
  const [history, setHistory] = useState([]);
  const [cityFilter, setCityFilter] = useState("");

  const fetchHistory = async () => {
    try {
      const data = await getHistory({
        city: cityFilter,
      });

      setHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchHistory();
    }, 300);

    return () => clearTimeout(timeout);
  }, [cityFilter]);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "weather-history.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    if (!history.length) return;

    const headers = ["City", "Country", "Temperature"];

    const rows = history.map((item) =>
      [item.city, item.country, item.temperature].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "weather-history.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);
      fetchHistory();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="history-section">
      <div className="history-header">
        <h2>Search History</h2>

        <div className="history-actions">
          <button className="json-btn" onClick={exportJSON}>
            JSON
          </button>

          <button className="csv-btn" onClick={exportCSV}>
            CSV
          </button>
        </div>
      </div>

      <div className="history-search">
        <input
          type="text"
          placeholder="🔍 Search city..."
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        />
      </div>

      {!history.length ? (
        <p className="empty-history">No searches found.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div
              key={item.id || item._id}
              className="history-card"
              onClick={() => onSelectCity(item.city)}
            >
              <div className="history-left">
                <h3>📍 {item.city}</h3>

                <p>{item.country}</p>

                <small>
                  {formatHistoryDate(item.createdAt)}
                </small>
              </div>

              <div className="history-right">
                <span>{Math.round(item.temperature)}°</span>

                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id || item._id);
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default History;