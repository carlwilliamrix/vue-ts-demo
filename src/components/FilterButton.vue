<script lang="ts" setup>
// Import the EventFilter type so props and emits are type-safe
import type { EventFilter } from '../types';

// defineProps with a TypeScript generic provides compile-time checking
// for the expected properties passed to this component.
const props = defineProps<{
    // 'filter' is the filter this button represents (e.g. "all", "Active")
    filter: EventFilter;
    // 'currentFilter' is the active filter from the parent so the button can render differently when selected.
    currentFilter: EventFilter;
}>();

// defineEmits declares the events this component can emit
const emits = defineEmits<{
    // Parent expects a 'setFilter' event with the selected EventFilter value.
    setFilter: [filter: EventFilter];
}>();
</script>

<template>
    <!--
        This button triggers a filter change when clicked.
        - '@click' calls the typed 'emits' function to notify parent.
        - The dynamic ':class' applies the contrast class when the
            'currentFilter' matches this button's 'filter', giving visual feedback.
    -->
    <button
        class="secondary"
        @click="emits('setFilter', props.filter)"
        :class="{ contrast: props.currentFilter === props.filter }"
    >
        {{ props.filter }}
    </button>
</template>

<style scoped>
button {
    text-transform: capitalize;
}
</style>