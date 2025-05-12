<template>
  <div id="app">
    <h1 class="title">To-Do List</h1>

    <!-- Filtros -->
    <div class="filters">
      <button @click="filterTasks('all')" :class="{ active: filter === 'all' }">Todas</button>
      <button @click="filterTasks('completed')" :class="{ active: filter === 'completed' }">Concluídas</button>
      <button @click="filterTasks('pending')" :class="{ active: filter === 'pending' }">Pendentes</button>
    </div>

    <!-- Lista de Tarefas -->
    <div class="task-list">
      <div
        v-for="(task, index) in filteredTasks"
        :key="index"
        class="task"
        :class="{ completed: task.completed }"
      >
        <input type="checkbox" v-model="task.completed" @change="saveTasks" />
        <span>{{ task.name }}</span>
        <button @click="deleteTask(index)" class="delete-btn">🗑️</button>
      </div>
    </div>

    <!-- Adicionar Tarefa -->
    <div class="add-task-container">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Digite uma tarefa..."
        class="task-input"
      />
      <button @click="addTask" class="add-btn">Adicionar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      newTask: '',
      filter: 'all',
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'completed') {
        return this.tasks.filter(task => task.completed);
      }
      if (this.filter === 'pending') {
        return this.tasks.filter(task => !task.completed);
      }
      return this.tasks;
    },
  },
  methods: {
    addTask() {
      const name = this.newTask.trim();
      if (!name) return;
      this.tasks.push({ name, completed: false });
      this.newTask = '';
      this.saveTasks();
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    filterTasks(status) {
      this.filter = status;
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  #background: linear-gradient(135deg, #fcd77f, #ff9a00, #ff4e50, #f9d423);
  background: linear-gradient(135deg, #fbd7a2, #f8b7a0, #f5a4d3, #f1c9d4);

  font-family: 'Dancing Script', cursive;

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

.filters {
  margin-bottom: 1rem;
}

.filters button {
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease;
  color: #fff;
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
  background-color: rgb(249, 211, 248);
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

.add-task-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.add-btn {
  background-color:rgb(200, 121, 224);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.add-btn:hover {
  background-color:rgb(142, 228, 209);
}
</style>
