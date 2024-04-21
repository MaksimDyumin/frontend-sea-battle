<script setup lang="ts">
import ListOpponents from '@/components/ListOpponents.vue'
</script>

<template>
    <main class="configure-ships">
        <ListOpponents />
    </main>
</template>

<style lang="scss">
.configure-ships {
    display: flex;
    align-items: center;
    margin: auto;
    margin-top: 12%;
}

@media (min-width: 1024px) {}
</style>
