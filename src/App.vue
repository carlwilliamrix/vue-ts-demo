<script lang="ts" setup>
import { ref, computed } from 'vue';
// Import the Form component like any other module
// To reference it, create an instance of it in the template section
import EventForm from './components/EventForm.vue';
import type { Event, EventFilter } from './types';
import EventList from './components/EventList.vue';
import FilterButton from './components/FilterButton.vue';

// State variables, to bind input to state variables see in HTML
// Built in directive is v-model
// Pass in a ref, with input this will update the ref value on input change
// Adding a change handler and updating the value
const message = ref("Welcome to Spaces.");

// Use the Event type from types.ts in a ref array/list
const events = ref<Event[]>([]);

const filter = ref<EventFilter>("all");

// Computed value that only changes if its dependecies change
const totalDone = computed(() => events
  .value
  .reduce((total, event) => event.active ? total + 1 : total, 0));

const filteredEvents = computed(() => {
  switch(filter.value) {
    case "all":
      return events.value;
    case "Active":
      return events.value.filter(event => event.active);
    case "Inactive":
      return events.value.filter(event => !event.active);
    default:
      return events.value;
  }
});

// Function to handle the event emitted from the EventForm component
// Function is called after emit has taken place
function addEvent(newEvent: string) {
  // Simply change the variable without worrying about immutability
  // Once it is changed Vue will change it wherever it is used
  events.value.push({
    id: crypto.randomUUID(),
    name: newEvent,
    location: 'TBD',
    active: true
  });
}

// Modify the state where it is created
function toggleEvent(id: String) {
  const event = events.value.find((event) => event.id  === id);
  if(event) {
    event.active = !event.active;
  }
}

function removeEvents(id: String) {
  const index = events.value.findIndex((event) => event.id === id);
  if(index !== -1) {
    events.value.splice(index, 1);
  }
}

function setFilter(value: EventFilter) {
  filter.value = value;
}

</script>

<template>
  <main>
    <h1>{{ message }} </h1>
    <EventForm @add-events="addEvent"/>
    <h3 v-if="!events.length">Add a task to get started.</h3>
    <h3 v-else>  {{ totalDone }} / {{ events.length }} events active.</h3>
    <div v-if="events.length" class="button-container">
      <FilterButton :currentFilter="filter" filter="all" @set-filter="setFilter"/>
      <FilterButton :currentFilter="filter" filter="Active" @set-filter="setFilter"/>
      <FilterButton :currentFilter="filter" filter="Inactive" @set-filter="setFilter"/>
      <!--
        Refactor all code below with components up top
        <button class="secondary" @click="filter = 'all'">All</button>
        <button class="secondary" @click="filter = 'Active'">Active</button>
        <button class="secondary" @click="filter = 'Inactive'">Inactive</button>
      -->
    </div>
    <EventList :events="filteredEvents" @toggle-event="toggleEvent" @remove-events="removeEvents"/>
  </main>  
</template>

<!--
Scoped CSS to this file.
Remove the scoped attribute to make styles global.
-->
<style>
main {
  max-width: 800px;
  margin: 1rem auto;
}

.button-container {
  display: flex;
  justify-content: end;
}

.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style> 
