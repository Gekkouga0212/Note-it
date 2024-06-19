<template>
  <div class="home">
    <h1>Welcome to Note It {{ userName }}</h1>
    <p v-if="!isLoggedIn">
      This is a task management application. Please register or login to use the features of this application.
    </p>
    <div v-else>
      <h2>Your Tasks</h2>
      <div class="sort-buttons">
        <button @click="setSortKey('dueDate')">Sort by Due Date</button>
        <button @click="setSortKey('completed')">Sort by Completed</button>
        <button @click="setSortKey('category')">Sort by Category</button>
      </div>
      <div class="task-list">
        <div v-for="task in sortedTasks" :key="task._id" class="task-item">
          <div class="task-info">
            <span class="task-title">{{ task.title }}</span>
            <span class="task-category">{{ task.category }}</span>
            <span class="task-date">{{ formatDate(task.dueDate) }}</span>
          </div>
          <div class="task-status">
            <input type="checkbox" v-model="task.completed" @change="updateTaskStatus(task)" /> Ukończone
          </div>
          <div class="task-actions">
            <button @click="confirmDeleteTask(task._id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
      <router-link to="/add" class="btn btn-primary">Create New Task</router-link>
    </div>

    <!-- Potwierdzenie usunięcia tasku -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showDeleteModal = false">&times;</span>
        <p>Are you sure you want to delete this task?</p>
        <button @click="deleteTask(taskToDelete)" class="btn btn-danger">Yes</button>
        <button @click="showDeleteModal = false" class="btn btn-secondary">No</button>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      showDeleteModal: false,
      taskToDelete: null,
      sortKey: '',
      sortOrder: 1,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userName() {
      return this.$store.state.user.username || '';
    },
    user() {
      return this.$store.state.user;
    },
    sortedTasks() {
      return this.tasks.slice().sort((a, b) => {
        if (this.sortKey) {
          const result = (a[this.sortKey] > b[this.sortKey] ? 1 : -1) * this.sortOrder;
          return result;
        } else {
          return 0;
        }
      });
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.fetchTasks();
    }
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/tasks', {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.tasks = this.tasks.filter(task => task._id !== taskId);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    async updateTaskStatus(task) {
      try {
        await axios.put(`http://localhost:3000/tasks/${task._id}`, task, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    },
    confirmDeleteTask(taskId) {
      this.taskToDelete = taskId;
      this.showDeleteModal = true;
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleString();
    },
    setSortKey(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    }
  }
};
</script>



<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
  text-align: center;
}

.sort-buttons {
  margin-bottom: 1em;
}

.sort-buttons button {
  margin-right: 0.5em;
  padding: 0.5em 1em;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

.sort-buttons button:hover {
  background-color: #0056b3;
}

.task-list {
  margin: 1em 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 0;
  border-bottom: 1px solid #ccc;
}

.task-info {
  flex: 2;
  text-align: left;
}

.task-category {
  margin-left: 1em;
  font-style: italic;
  color: #888;
}

.task-date {
  margin-left: 1em;
}

.task-status {
  flex: 1;
  text-align: center;
}

.task-actions {
  flex: 1;
  text-align: right;
}

.task-actions .btn {
  margin-left: 0.5em;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>


