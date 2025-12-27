import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    setTasks(res.data);
  };

  // Run once when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(`${API_URL}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  // Toggle completed
  const toggleTask = async (id, completed) => {
    await axios.put(`${API_URL}/tasks/${id}`, {
      completed: !completed,
    });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <h2>Task Manager</h2>
      <h1>akhila</h1>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button style={styles.addBtn} onClick={addTask}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            <span
              onClick={() => toggleTask(task.id, task.completed)}
              style={{
                ...styles.taskText,
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteTask(task.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// Simple inline styles
const styles = {
  container: {
    padding: 20,
    maxWidth: 500,
    margin: "auto",
    fontFamily: "Arial",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  addBtn: {
    padding: "8px 16px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "1px solid #ddd",
    paddingBottom: 5,
  },
  taskText: {
    cursor: "pointer",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
};
