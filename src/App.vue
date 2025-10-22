<script lang="ts" setup>
import { ref } from 'vue';

// State variables, to bind input to state variables see in HTML
// Built in directive is v-model
// Pass in a ref, with input this will update the ref value on input change
// Adding a change handler and updating the value
const message = ref("Welcome to Spaces.");
const eventName = ref("");

// We want to listen when this form is submitted
// For that we use the @ sign to add a DOM event
// When event is triggered we call this function
// We must use .value to get the value from a ref since it is essentially a object wrapper around a primitive value
function formSubmited() {
  alert(`Creating event: ${eventName.value}`);
}
</script>

<template>
  <main>
    <h1>{{ message }} </h1>
    <form @submit.prevent="formSubmited">
      <label>
        New Event       
        <input v-model="eventName" name="event-name" placeholder="Event Name" >
      </label>
      <div class="button-container">
        <button>Create Event: {{ eventName }}</button>
      </div>
    </form>
  </main>  
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 1rem auto;
}

</style>

<!--
Scoped CSS to this file.
-->
<style scoped>
main {
  max-width: 800px;
  margin: 1rem auto;
}

.button-container {
  display: flex;
  justify-content: end;
}
</style> 
