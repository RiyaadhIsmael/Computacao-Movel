<template>
  <div id="todo-app" class="container">
    <h1 class="title">To-Do List</h1>

    <!-- Input para nova tarefa -->
    <input
      v-model="newTask"
      type="text"
      class="task-input"
      placeholder="Adicionar nova tarefa"
      @keyup.enter="addTask"
    />

    <!-- Botão para adicionar tarefa -->
    <button class="add-btn" @click="addTask">Adicionar</button>

    <!-- Filtros -->
    <div class="filters">
      <button
        :class="{ active: filter === 'all' }"
        @click="filterTasks('all')"
      >Todos</button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filterTasks('completed')"
      >Concluídas</button>
      <button
        :class="{ active: filter === 'pending' }"
        @click="filterTasks('pending')"
      >Pendentes</button>
    </div>

    <!-- Lista de Tarefas -->
    <ul class="task-list">
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        :class="['task', { completed: task.completed }]"
      >
        <input
          type="checkbox"
          v-model="task.completed"
          @change="updateTaskStatus(task)"
        />
        <span>{{ task.text }}</span>
        <button class="delete-btn" @click="removeTask(task.id)">✕</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoApp',
  data() {
    return {
      newTask: '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      filter: 'all',
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'completed') {
        return this.tasks.filter((task) => task.completed);
      } else if (this.filter === 'pending') {
        return this.tasks.filter((task) => !task.completed);
      }
      return this.tasks;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === '') return;
      const newTask = {
        id: Date.now(),
        text: this.newTask.trim(),
        completed: false,
      };
      this.tasks.push(newTask);
      this.saveTasks();
      this.newTask = '';
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
    },
    updateTaskStatus(task) {
      this.saveTasks();
    },
    filterTasks(filter) {
      this.filter = filter;
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
};
</script>

<style scoped>
#todo-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #fceabb 0%, #f8b500 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #333;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.task-input {
  width: 80%;
  max-width: 400px;
  padding: 12px;
  font-size: 1.1rem;
  border: 2px solid #ffb347;
  border-radius: 10px;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #ffb347 0%, #ffcc33 100%);
  border: none;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.add-btn:hover {
  background: linear-gradient(135deg, #ffcc33 0%, #ffb347 100%);
  transform: scale(1.05);
}

.filters {
  margin: 1rem 0;
}

.filters button {
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  transition: 0.3s ease;
}

.filters button.active,
.filters button:hover {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
  transform: scale(1.05);
}

.task-list {
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
  padding: 0;
  list-style: none;
}

.task {
  background-color: #ffffffcc;
  border-radius: 12px;
  padding: 10px 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.task.completed {
  text-decoration: line-through;
  background-color: #d3f9d8;
}

.task input[type='checkbox'] {
  transform: scale(1.3);
  margin-right: 10px;
}

.task span {
  flex-grow: 1;
  font-size: 1.1rem;
  color: #444;
}

.delete-btn {
  background-color: #ff6b6b;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.delete-btn:hover {
  background-color: #ff4d4d;
}
</style>
