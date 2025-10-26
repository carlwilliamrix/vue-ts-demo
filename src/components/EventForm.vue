<script lang="ts" setup>
import { ref } from 'vue';

// Built in compiler Macro. 
// Emits events to parent components (typed). 
const emit = defineEmits<{
  addEvents: [newTask: string];
}>();

// Reactive state for input and error message
// 'ref' makes these value reactive
const eventName = ref("");
const error = ref("");

// Handles form submission from DOM event
// Use .value to get the value from ref since it is 
// essentially an object wrapper around a primitive value
function formSubmitted() {
    if(eventName.value.trim()) {
    // Trigger event for parent component
    emit('addEvents', eventName.value);
    } else {
        // Use v-if directive to conditionally show error message
        // Change event handler removes the error when user starts typing
        error.value = "Please provide a valid name for the event.";
    }
}
</script>

<template>
    <form @submit.prevent="formSubmitted">
        <label>
            New Event       
            <input 
                v-model="eventName" 
                name="event-name" 
                placeholder="Event Name" 
                :aria-invalid="!!error || undefined"
                @input="error = ''"
            >
            <small v-if="error" id="invalid-helper">
                {{ error}}
            </small>
        </label>
        <div class="button-container">
            <button>Create Event: {{ eventName }}</button>
        </div>
    </form>
</template>