<template>
  <div class="add-task-container">
    <h2>Add New Task</h2>
    <form @submit.prevent="addTask">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" v-model="task.title" id="title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select v-model="task.category" id="category" class="form-control" required>
          <option v-for="category in user.categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="dueDate" class="form-label">Due Date</label>
        <input type="date" v-model="task.dueDate" :min="minDate" id="dueDate" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="dueTime" class="form-label">Due Time</label>
        <input type="time" v-model="task.dueTime" id="dueTime" class="form-control" required />
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <button type="submit" class="btn btn-primary">Add Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      task: {
        title: '',
        category: '',
        dueDate: '',
        dueTime: '',
        completed: false,
      },
      errorMessage: '',
      minDate: this.getTodayDate()
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    getTodayDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
    async addTask() {
      try {
        const dueDateTime = new Date(`${this.task.dueDate}T${this.task.dueTime}`);
        await axios.post('http://localhost:3000/tasks', { ...this.task, dueDate: dueDateTime }, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  }
};
</script>

<style scoped>
.add-task-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.mb-3 {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 1em;
}
</style>
