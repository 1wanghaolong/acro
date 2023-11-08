<template>
    <otcindex v-if="$permission(['otcindex'])"></otcindex>
    <wealthindex v-if="$permission(['wealthindex'])"></wealthindex>
    <huaxiaindex v-if="$permission(['huaxiaindex'])"></huaxiaindex>
</template>

<script lang="ts" setup>
import wealthindex from './wealthindex.vue'
import otcindex from './otcindex.vue'
import huaxiaindex from './huaxiaindex.vue'
</script>