import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    tasks: [],
  },
  mutations: {
    auth_success(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.token = '';
      state.user = {};
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  actions: {
    async login({ commit, dispatch }, user) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        commit('auth_success', { token, user: response.data.user });
        dispatch('fetchUser');
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async register({ commit, dispatch }, user) {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        commit('auth_success', { token, user: response.data.user });
        dispatch('fetchUser');
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('logout');
    },
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/tasks', {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        commit('setTasks', response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async addTask({ dispatch }, task) {
      try {
        await axios.post('http://localhost:3000/tasks', task, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        dispatch('fetchTasks');
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async deleteTask({ dispatch }, taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        dispatch('fetchTasks');
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async toggleComplete({ dispatch, state }, taskId) {
      const task = state.tasks.find(t => t._id === taskId);
      task.completed = !task.completed;
      await axios.put(`http://localhost:3000/tasks/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${this.state.token}`
        }
      });
      dispatch('fetchTasks');
    },
    async updateUser({ commit }, user) {
      try {
        const response = await axios.put('http://localhost:3000/auth/user', user, {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        commit('updateUser', response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async fetchUser({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/auth/user', {
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    tasks: state => state.tasks,
  }
});

export default store;
