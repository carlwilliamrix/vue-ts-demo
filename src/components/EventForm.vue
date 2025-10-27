<script lang="ts" setup>
import { ref } from 'vue';

// defineEmits is a compiler macro that declares the events this component can emit. 
const emit = defineEmits<{
    // The parent listens for 'add-events'. Payload is the new event name as a string.
    addEvents: [newTask: string];
}>();

// Reactive state: 'ref' wraps a primitive so Vue can track changes.
// Use '.value' in the script to read/write, templates unwrap refs automatically.
const eventName = ref('');
const error = ref('');

// Called when the user submits the form. We validate the input and either
// emit the typed event to the parent or set a local error message.
function formSubmitted() {
    // Trim input and ensure it's not empty
    if (eventName.value.trim()) {
        // Emit the event with the new event name. Parent component handles adding it.
        emit('addEvents', eventName.value);
        // Optionally clear the input after creating an event
        eventName.value = '';
    } else {
        // Set a local error message which the template displays conditionally
        error.value = 'Please provide a valid name for the event.';
    }
}
</script>

<template>
    <!--
        Simple form to create a new event.
        - '@submit.prevent' prevents page reload and calls 'formSubmitted'.
        - 'v-model' binds the input to the 'eventName' ref (two-way).
        - ':aria-invalid' improves accessibility when the input is invalid.
        - '@input' resets the error when the user starts typing.
    -->
    <form @submit.prevent="formSubmitted">
        <label>
            New Event
            <input
                v-model="eventName"
                name="event-name"
                placeholder="Event Name"
                :aria-invalid="!!error || undefined"
                @input="error = ''"
            />

            <!-- Error helper: shown only when 'error' is non-empty -->
            <small v-if="error" id="invalid-helper">{{ error }}</small>
        </label>
        <div class="button-container">
            <button>Create Event: {{ eventName }}</button>
        </div>
    </form>
</template>