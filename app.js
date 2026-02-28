// Cargamos las tareas desde LocalStorage.
// Si no existe nada guardado usamos array vacío.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Referencia a elementos del DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

// Guarda el array de tareas en LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderiza las tareas en pantalla según el filtro seleccionado
function renderTasks(filter = "all") {
    // Limpiamos la lista antes de volver a dibujarla
    taskList.innerHTML = "";

    // Filtramos según estado: todas, pendientes o completada
    let filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true; // "all"
    });

    // Recorremos las tareas filtradas y se muestran.
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        // Si está completada -> añadimos la clase CSS
        li.className = task.completed ? "completed" : "";

        // Todas tienen su texto y botones:
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">✖</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Añade una nueva tarea al array
function addTask() {
    // No añadir tareas vacías
    if (taskInput.value.trim() === "") return;

    // Creamos tarea(objeto)
    tasks.push({
        text: taskInput.value,
        completed: false
    });

    // reseteamos el input
    taskInput.value = "";

    // Guardamos y actualizamos vista
    saveTasks();
    renderTasks();
}

// Cambia el estado de una tarea (pendiente a completada o viceversa)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Elimina una tarea del array
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Evento, para añadir tarea hacer clic en el botón
addTaskBtn.addEventListener("click", addTask);

// Eventos para los botones de filtro
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        renderTasks(button.dataset.filter);
    });
});

// Render inicial al cargar página
renderTasks();