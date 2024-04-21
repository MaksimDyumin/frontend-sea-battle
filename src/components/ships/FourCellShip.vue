<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { onMounted, ref } from 'vue';


const choosedShip: any = ref(null)
const gameStore = useGameStore()

onMounted(() => {
	gameStore.choosedElement = choosedShip
})

</script>

<template>
	<div ref="choosedShip" class="four-cell-ship">
		<div class="cell" v-for="item in 4"></div>
	</div>
</template>

<style lang="scss">
.four-cell-ship {
	display: flex;
	height: 33px;
	cursor: pointer;

	.cell {
		display: flex;
		width: 34px;
		height: 34px;
		border: 3px solid blue;
		z-index: 2;
		box-sizing: inherit;
		margin-right: -1px;
		margin-top: -1px;
		position: relative;
	}
}
</style>
