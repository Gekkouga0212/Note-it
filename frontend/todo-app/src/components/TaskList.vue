<template>
    <div class="task-list">
      <h2>Your Tasks</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p>Due: {{ task.dueDate }}</p>
          <p>Category: {{ task.category }}</p>
          <p>
            <label>
              <input type="checkbox" v-model="task.completed" @change="toggleCompletion(task)">
              Completed
            </label>
          </p>
          
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tasks: {
        type: Array,
        required: true
      }
    },
    methods: {
      toggleCompletion(task) {
        this.$emit('update-task-status', { taskId: task.id, completed: task.completed });
      }
    }
  }
  </script>
  
  <style scoped>
  .task-list {
    max-width: 800px;
    margin: auto;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
  }
  
  .btn-warning {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #ffc107;
    color: white;
    text-align: center;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
  }
  
  .btn-warning:hover {
    background-color: #e0a800;
  }
  </style>
  