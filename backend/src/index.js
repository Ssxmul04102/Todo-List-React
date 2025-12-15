const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tareas = [];

/* Obtener tareas */
app.get("/tasks", (req, res) => {
  res.json(tareas);
});

/* Crear tarea */
app.post("/tasks", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Texto requerido" });
  }

  const nuevaTarea = {
    id: Date.now(),
    text,
    completed: false
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

/* Cambiar estado */
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tareas = tareas.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );

  res.json({ ok: true });
});

/* Eliminar tarea */
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tareas = tareas.filter(t => t.id !== id);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en puerto ${PORT}`);
});
