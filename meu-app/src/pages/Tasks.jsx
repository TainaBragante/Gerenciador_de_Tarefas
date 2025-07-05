import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Tasks() {
  const navigate = useNavigate();

  // Tarefas carregadas do localStorage
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  // Inputs do controle
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Atualiza o localStorage sempre que as tarefas mudam
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Função de adicionar nova tarefa
  const addTask = () => {
    if (!title.trim()) return; 
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
    };
    setTasks((old) => [...old, newTask]);
    setTitle("");
    setDescription("");
  };

  // Função de excluir tarefa pelo id
  const deleteTask = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      return;
    }
    setTasks((old) => old.filter((task) => task.id !== id));
  };

  return (
    <div className="app-container">

      <h1>Gerenciador de Tarefas</h1>

      <div className="form-group">
        <input
          className="task-title-input"
          type="text"
          placeholder="Digite o título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          className="task-description-input"
          type="text"
          placeholder="Digite a descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <button className="add-task-button" onClick={addTask}>
          Adicionar Tarefa
        </button>
      </div>


      <div className="task-list">

        <h2>Lista de Tarefas</h2>

        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <div className="task-item-buttons">
                <button
                  className="details-button"
                  onClick={() => navigate(`/task/${task.id}`)}
                >Ver descrição</button>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >Excluir</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
      
    </div>
  );
}
