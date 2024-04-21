<script setup lang="ts">
import FourCellShip from './ships/FourCellShip.vue';
import OneCellShip from './ships/OneCellShip.vue';
import ThreCellShip from './ships/ThreCellShip.vue';
import TwoCellShip from './ships/TwoCellShip.vue';

import { shallowRef, ref, onMounted, defineComponent, onUnmounted } from "vue";
import type { Component, ShallowRef, Ref } from "vue";
import { useGameStore } from "@/stores/game";
import { Orientation } from '@/stores/store.types';

let componentT: any = shallowRef(null)
let choosedElement: Ref = ref(null)
const gameStore = useGameStore()


const trackMouse = (event: MouseEvent) => {
	const el: HTMLElement = gameStore.choosedElement

	if (gameStore.choosedElement && gameStore.choosedElement instanceof HTMLElement) {
		document.onkeydown = function (evt) {
			evt = evt || window.event;
			const isPressedR = evt.keyCode === 82 && gameStore.enabledOrientation
			if (isPressedR) {
				if (gameStore.rCounter % 2 !== 0) {
					el.style.transform = 'rotate(90deg)'
					gameStore.orientation = Orientation.onY
				} else {
					el.style.transform = 'rotate(0deg)'
					gameStore.orientation = Orientation.onX
				}
				gameStore.rCounter += 1
			}
		};
		const width = el.offsetWidth;
		const height = el.offsetHeight;
		const mouseX = event.pageX - width / 2;
		const mouseY = event.pageY - height / 2;
		el.style.left = mouseX + 'px';
		el.style.top = mouseY + 'px';
	}
};

async function chooseShip(comp: Component, e: any, shipLength: number) {
	if (!gameStore.enabledOrientation) return
	componentT.value = comp
	gameStore.isChoosing = true
	gameStore.shipLength = shipLength


	await new Promise<void>(res => {
		setTimeout(() => {
			res()
		}, 0);
	})

	const el: HTMLElement = gameStore.choosedElement
	const width = el.offsetWidth;
	const height = el.offsetHeight;
	const mouseX = e.clientX - width / 2;
	const mouseY = e.clientY - height / 2;
	el.style.left = mouseX + 'px';
	el.style.top = mouseY + 'px';
	if (gameStore.orientation === Orientation.onY) {
		el.style.transform = 'rotate(90deg)'
	}

	gameStore.mosemoveFn = trackMouse
	window.addEventListener('mousemove', trackMouse);
}
onUnmounted(() => {
	window.removeEventListener('mousemove', trackMouse)
})
</script>

<template>
	<div class="ships-manager">
		<FourCellShip @click="chooseShip(FourCellShip, $event, 4)" class="ship" />
		<ThreCellShip @click="chooseShip(ThreCellShip, $event, 3)" class="ship" />
		<TwoCellShip @click="chooseShip(TwoCellShip, $event, 2)" class="ship" />
		<OneCellShip @click="chooseShip(OneCellShip, $event, 1)" class="ship" />

		<div v-if="gameStore.isChoosing">
			<component ref="choosedElement" class="choosed-element" :is="componentT"></component>
		</div>
	</div>
</template>

<style lang="scss">
.ships-manager {
	display: flex;
	flex-direction: column;
	margin-right: 100px;

	.ship+.ship {
		margin-top: 20px;
	}
}

.choosed-element {
	position: absolute;
	z-index: 4;
	pointer-events: none;
}
</style>
