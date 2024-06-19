<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/Noteit.png" alt="Note It" class="logo">
      </router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/user-panel" class="nav-link">User Panel</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button @click="confirmLogout" class="nav-link btn btn-link">Logout</button>
        </li>
      </ul>
    </nav>
    <router-view />
    <div v-if="showLogoutModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showLogoutModal = false">&times;</span>
        <p>Are you sure you want to logout?</p>
        <button @click="logout" class="btn btn-danger">Yes</button>
        <button @click="showLogoutModal = false" class="btn btn-secondary">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  data() {
    return {
      showLogoutModal: false
    };
  },
  methods: {
    confirmLogout() {
      this.showLogoutModal = true;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
      this.showLogoutModal = false;
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.$store.dispatch('fetchUser');
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #f8f9fa;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand img.logo {
  height: 60px;
}

.navbar-nav {
  list-style: none;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 1em;
}

.nav-link {
  text-decoration: none;
  color: #000;
  padding: 0.5em;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #007bff;
}

.btn-link {
  background: none;
  border: none;
  padding: 0.5em;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  transition: color 0.3s;
}

.btn-link:hover {
  color: #007bff;
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
