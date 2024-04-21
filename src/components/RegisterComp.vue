<template>
  <div class="auth-container">
    <h2>Регистрация</h2>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <form @submit.prevent="handleRegistration">
      <div class="form-group">
        <label for="email">Имя:</label>
        <input type="email" id="email" v-model="userName" required>
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>

    <button @click="goToLogin" class="btn btn-secondary mt-4">Перейти к входу</button>
  </div>
</template>


<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const userName: Ref<string> = ref('')
const password: Ref<string> = ref('')
const errorMessage: Ref<string> = ref('')
const router = useRouter()
const userStore = useUserStore()

async function handleRegistration() {
  userStore.register({ userName: userName.value, password: password.value })
}

function goToLogin() {
  router.push({ name: 'login' });
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}

.mt-4 {
  margin-top: 8px;
}

.error {
  color: red;
}
</style>