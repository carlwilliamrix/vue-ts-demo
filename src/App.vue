<script lang="ts" setup>
// Core Vue imports for reactivity and computed values
import { ref, computed } from 'vue';
// Import the Form component like any other module
// To reference it, create an instance of it in the template section
import EventForm from './components/EventForm.vue';
import EventList from './components/EventList.vue';
import FilterButton from './components/FilterButton.vue';

// Type imports to make state and function signatures explicit and type-safe
import type { Event, EventFilter } from './types';

/*
  Reactive application state
  - 'message' is a simple welcome string displayed in the header.
  - 'events' is a reactive array of 'Event' objects (typed with TypeScript).
  - 'filter' tracks the currently selected EventFilter ("all" | "Active" | "Inactive").
  Note: In templates Vue automatically unwraps refs, so passing 'filteredEvents'
  (a computed ref) to a child prop behaves like passing the raw array.
*/
const message = ref('Welcome to Spaces.');
const events = ref<Event[]>([]);
const filter = ref<EventFilter>('all');

// A derived value computed from 'events'. Recomputes only when 'events' changes.
const totalDone = computed(() =>
  events.value.reduce((total, event) => (event.active ? total + 1 : total), 0)
);

// Filter logic is centralized here. The template uses 'filteredEvents' to render
// the list so the view only receives the relevant items for the current filter.
const filteredEvents = computed(() => {
  switch (filter.value) {
    case 'all':
      return events.value;
    case 'Active':
      return events.value.filter((event) => event.active);
    case 'Inactive':
      return events.value.filter((event) => !event.active);
    default:
      return events.value;
  }
});

/*
  Handlers called by child components via emits:
  - 'addEvent' is invoked when 'EventForm' emits a new event name.
  - 'toggleEvent' flips the 'active' flag for the event with the matching id.
  - 'removeEvents' removes an event by id.
  - 'setFilter' updates the 'filter' ref when a FilterButton is clicked.
  These functions mutate reactive state directly (Vue tracks mutations to refs).
*/
function addEvent(newEvent: string) {
  events.value.push({
    id: crypto.randomUUID(),
    name: newEvent,
    location: 'TBD',
    active: true,
  });
}

function toggleEvent(id: string) {
  const event = events.value.find((event) => event.id === id);
  if (event) event.active = !event.active;
}

function removeEvents(id: string) {
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
    <!-- Header: uses the 'message' reactive string declared in script -->
    <h1>{{ message }}</h1>

    <!-- EventForm: child component that emits 'add-events' with the new event name -->
    <EventForm @add-events="addEvent" />

    <!--
      Conditional UI:
      - When there are no events we prompt the user to add one.
      - When events exist, we show how many are active using the computed 'totalDone'.
    -->
    <h3 v-if="!events.length">Add a task to get started.</h3>
    <h3 v-else>{{ totalDone }} / {{ events.length }} events active.</h3>

    <!-- Filter controls: each 'FilterButton' emits 'set-filter' with its filter value -->
    <div v-if="events.length" class="button-container">
      <FilterButton :currentFilter="filter" filter="all" @set-filter="setFilter" />
      <FilterButton :currentFilter="filter" filter="Active" @set-filter="setFilter" />
      <FilterButton :currentFilter="filter" filter="Inactive" @set-filter="setFilter" />
    </div>

    <!--
      EventList: receives 'filteredEvents' (computed ref) and renders items.
      - Vue automatically unwraps refs in templates, so the child receives the
        actual array value.
      - The list emits 'toggle-event' and 'remove-events' which map to local handlers.
    -->
    <EventList
      :events="filteredEvents"
      @toggle-event="toggleEvent"
      @remove-events="removeEvents"
    />
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
