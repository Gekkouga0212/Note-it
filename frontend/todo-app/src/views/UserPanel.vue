<template>
  <div class="user-panel">
    <h2>User Panel</h2>
    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="user.username" id="username" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="user.email" id="email" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Update User</button>
    </form>

    <h3>Create New Category</h3>
    <form @submit.prevent="addCategory">
      <div class="form-group">
        <label for="newCategory">Category Name</label>
        <input type="text" v-model="newCategory" id="newCategory" required class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Add Category</button>
    </form>

    <h3>Your Categories</h3>
    <ul class="list-group">
      <li v-for="category in user.categories" :key="category" class="list-group-item d-flex justify-content-between align-items-center">
        {{ category }}
        <button @click="confirmDeleteCategory(category)" class="btn btn-danger btn-sm">Delete</button>
      </li>
    </ul>

    <!-- Potwierdzenie usunięcia kategorii -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showDeleteModal = false">&times;</span>
        <p>Are you sure you want to delete this category?</p>
        <button @click="deleteCategory(categoryToDelete)" class="btn btn-danger">Yes</button>
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
      user: {
        username: '',
        email: '',
        categories: []
      },
      newCategory: '',
      showDeleteModal: false,
      categoryToDelete: null,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3000/auth/user', {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.user = response.data;
        this.$store.commit('setUser', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser() {
      try {
        const response = await axios.put('http://localhost:3000/auth/user', this.user, {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          }
        });
        this.user = response.data;
        this.$store.commit('setUser', response.data);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async addCategory() {
      if (this.newCategory.trim() !== '') {
        this.user.categories.push(this.newCategory.trim());
        this.newCategory = '';
        await this.updateUser();
      }
    },
    confirmDeleteCategory(category) {
      this.categoryToDelete = category;
      this.showDeleteModal = true;
    },
    async deleteCategory(category) {
      this.user.categories = this.user.categories.filter(cat => cat !== category);
      await this.updateUser();
      this.showDeleteModal = false;
    }
  }
};
</script>

<style scoped>
.user-panel {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
}

.form-control {
  width: 100%;
  padding: 0.5em;
  margin-bottom: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-primary {
  width: 100%;
  padding: 0.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border-radius: 10px;
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
