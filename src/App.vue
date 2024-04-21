<script setup lang="ts">
import { RouterView } from 'vue-router'
import NormalScreenHeader from './components/NormalScreenHeader.vue';
import AppFooter from './components/AppFooter.vue';


function moc() {
  console.log('adsad');
}


</script>

<template>
  <NormalScreenHeader />
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <AppFooter />
</template>

<style scoped></style>
