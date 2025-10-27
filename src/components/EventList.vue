<script setup lang="ts">
import { TransitionGroup } from 'vue';
import type { Event } from '../types';

// defineProps gives us a typed interface for the component inputs.
// This makes it clear that this component expects an array of Event objects.
const props = defineProps<{
  events: Event[];
}>();

// defineEmits declares the events this component may emit. Keeping these
// typed helps avoid mistakes when emitting event names or payloads.
const emits = defineEmits<{
  // Emitted when a user toggles an event's active state
  toggleEvent: [id: string];
  // Emitted when a user requests an event removal
  removeEvents: [id: string];
}>();
</script>

<!--
  Template notes:
  - We use 'TransitionGroup' to animate items entering and leaving the list.
  - 'v-for' iterates over 'props.events' and requires a stable ':key' (here 'event.id').
  - Inputs and buttons call the typed 'emits' function to notify the parent component.
  - Class bindings (':class') are used to reflect the event's 'active' state in the UI.
-->
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