<script setup lang="ts">
import AppLogo from './icons/AppLogo.vue';
</script>

<template>
  <div class="footer">
    <div class="footer-container">
      <div class="logo-container">
        <AppLogo />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;
  width: 100%;
  height: 120px;
  box-shadow: 1px 0.5px 1.5px 0.3px;
  background-color: #000;
  display: flex;
  justify-content: center;

  .footer-container {
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
  }
}
</style>
