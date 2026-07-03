import { useEffect, useState } from "react";
import { getHistory, deleteHistory, updateHistory } from "../../services/api";
import "./History.css";
import { formatHistoryDate } from "../../utils/dateUtils";

function History({ refresh, onSelectCity }) {
  const [history, setHistory] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ city: "", temperature: "" });

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

  const startEdit = (item) => {
    setEditingId(item.id || item._id);
    setEditForm({
      city: item.city,
      temperature: item.temperature,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ city: "", temperature: "" });
  };

  const saveEdit = async (id) => {
    try {
      if (!editForm.city.trim()) {
        alert("City cannot be empty");
        return;
      }

      if (editForm.temperature === "" || isNaN(Number(editForm.temperature))) {
        alert("Temperature must be a valid number");
        return;
      }

      console.log("Enviando update:", id, editForm);

      const result = await updateHistory(id, {
        city: editForm.city,
        temperature: Number(editForm.temperature),
      });

      console.log("Update exitoso:", result);

      cancelEdit();
      fetchHistory();
    } catch (error) {
      console.error("Error en update:", error);
      alert(
        "Error al actualizar: " +
          (error.response?.data?.error || error.message)
      );
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
          {history.map((item) => {
            const id = item.id || item._id;
            const isEditing = editingId === id;

            return (
              <div
                key={id}
                className="history-card"
                onClick={() => !isEditing && onSelectCity(item.city)}
              >
                {isEditing ? (
                  <div
                    className="history-edit-form"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) =>
                        setEditForm({ ...editForm, city: e.target.value })
                      }
                      placeholder="City"
                    />

                    <input
                      type="number"
                      value={editForm.temperature}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          temperature: e.target.value,
                        })
                      }
                      placeholder="°C"
                    />

                    <div className="history-edit-actions">
                      <button
                        type="button"
                        className="icon-button save-button"
                        onClick={() => saveEdit(id)}
                      >
                        💾
                      </button>

                      <button
                        type="button"
                        className="icon-button cancel-button"
                        onClick={cancelEdit}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="history-left">
                      <h3>📍 {item.city}</h3>

                      <p>{item.country}</p>

                      <small>{formatHistoryDate(item.createdAt)}</small>
                    </div>

                    <div className="history-right">
                      <span>{Math.round(item.temperature)}°</span>

                      <button
                        type="button"
                        className="icon-button edit-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(item);
                        }}
                      >
                        ✏️
                      </button>

                      <button
                        type="button"
                        className="icon-button delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(id);
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default History;