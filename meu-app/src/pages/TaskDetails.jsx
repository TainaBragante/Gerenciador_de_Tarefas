import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      const arr = JSON.parse(stored);
      const found = arr.find((t) => t.id === Number(id));
      setTask(found || null);
    }
  }, [id]);

  if (!task) {
    return (
      <div className="app-container">
        <h1>Tarefa não encontrada</h1>
        <button onClick={() => navigate("/tasks")}>
          Voltar à lista
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>{task.title}</h1>
      <p id="detailed">{task.description}</p>
      <button id="back-list" onClick={() => navigate("/tasks")}>
        Voltar à lista
      </button>
    </div>
  );
}

