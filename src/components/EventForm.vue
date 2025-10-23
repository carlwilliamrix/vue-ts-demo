<script lang="ts" setup>
import { ref } from 'vue';

// So that parent components can listen to events from this component:
// Emit events, Compiler Macro that is built in to Vue
// Can pass in a typescript type to define the types of emits
// Here we emit addEvents
const emit = defineEmits<{
  addEvents: [newTask: string];
}>();

// State variables, to bind input to state variables see in HTML
// Built in directive is v-model
// Pass in a ref, with input this will update the ref value on input change
// Adding a change handler and updating the value
const eventName = ref("");
const error = ref("");

// We want to listen when this form is submitted
// For that we use the @ sign to add a DOM event
// When event is triggered we call this function
// We must use .value to get the value from a ref since it is essentially a object wrapper around a primitive value
function formSubmitted() {
    if(eventName.value.trim()) {
    // Listen to this emit in the parent component
    emit('addEvents', eventName.value);
    //alert(`Creating event: ${eventName.value}`);
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