<template>
  <div class="menu">
    <div class="mode-buttons">
      <button :class="mode === 'add' ? 'add-ship-mode' : ''" @click="setMode('add')">Добавить корабли</button>
      <button :class="mode === 'remove' ? 'remove-ship-mode' : ''" @click="setMode('remove')">Удалить
        корабли</button>
    </div>
    <button @click="deleteAllShips" class="delete-button">Удалить все
      корабли</button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { ref } from "vue";
import type { Ref } from "vue";

const mode: Ref<string> = ref('add')
const gameStore = useGameStore()

function setMode(newMode: string) {
  if (newMode === 'add') {
    gameStore.enabledOrientation = true
    gameStore.deleteMode = false
  } else {
    gameStore.enabledOrientation = false
    gameStore.deleteMode = true
  }
  mode.value = newMode;
}

function deleteAllShips() {
  gameStore.clearBoard()
}


</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mode-buttons {
  margin-bottom: 20px;
}

.remove-ship-mode {
  background-color: #e57373 !important;
  color: white !important;
}

.add-ship-mode {
  background-color: #2196F3 !important;
  color: white !important;
}

.mode-buttons button {
  background-color: #ccc;
  border: none;
  color: #333;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}



.delete-button {
  background-color: #f44336;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* .delete-button:hover {
  background-color: #d32f2f;
}

.delete-button-active {
  background-color: #4CAF50;
} */
</style>