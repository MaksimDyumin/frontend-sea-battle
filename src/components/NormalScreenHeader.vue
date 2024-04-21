<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import AppLogo from './icons/AppLogo.vue';

const userStore = useUserStore()
</script>

<template>
  <div class="header">
    <div class="header-container">
      <div class="logo-container">
        <AppLogo @click="$router.push({ name: 'home' })" />
      </div>
      <div class="nav-options">
        <button @click="$router.push({ name: 'searchOpponent' })">Поиск соперников</button>
        <button @click="$router.push({ name: 'configureShips' })">Расстановка кораблей</button>
        <mdicon @click="$router.push({ name: 'login' })" v-if="userStore.isUserNotLogedIn" name="login" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  box-shadow: 1px 0.5px 1.5px 0.3px;
  display: flex;
  justify-content: center;

  .header-container {
    max-width: 1440px;
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      margin: auto 0;
    }

    .nav-options {
      height: 100%;
      display: flex;
      align-items: center;

      button {
        margin-right: 10px;
      }

      span {
        cursor: pointer;
      }
    }
  }
}
</style>
