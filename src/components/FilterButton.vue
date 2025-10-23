<script lang="ts" setup>
import type { EventFilter } from '../types';

const props = defineProps<{
    filter: EventFilter;
    currentFilter: EventFilter;
}>();

const emits = defineEmits<{
    setFilter: [filter: EventFilter]
}>();
</script>

<template>
    <button
        class="secondary" 
        @click="emits('setFilter', props.filter)"
        :class="{
            contrast: props.currentFilter === props.filter
        }"
    >
        {{ props.filter }}
    </button>
</template>

<style scoped>
button {
    text-transform: capitalize;
}
</style>