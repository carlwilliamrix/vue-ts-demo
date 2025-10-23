<script setup lang="ts">
import { TransitionGroup } from 'vue';
import type { Event } from '../types';

// Compiler Macro to define props for this component
const props = defineProps<{
  events: Event[]
}>();

// Parent can look for the string an in turn update the property
const emits = defineEmits<{
  toggleEvent:[id: string];
  removeEvents: [id: string];
}>();
</script>

<template>
    <TransitionGroup name="list" tag="div" class="event-list">
      <article v-for="event in events" class="event" :key="event.id">
          <label> 
              <input 
                  @input="emits('toggleEvent', event.id)" 
                  :checked="event.active" 
                  type="checkbox"
              />
              <span :class="{ done: !event.active }">{{ event.name }}</span>
          </label>
          <button @click="emits('removeEvents', event.id)" class="outline">Remove</button>
      </article>
    </TransitionGroup>    
</template>

<style scoped>
.event-list {
  margin-top: 1rem;
}

.done {
  text-decoration: line-through;
}

.event {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>