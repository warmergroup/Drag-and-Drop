import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style.css';

// Create Pinia instance
const pinia = createPinia();

// Create Vue app and integrate Pinia
const app = createApp(App);
app.use(pinia); // Attach Pinia to the Vue app
app.mount('#app'); // Mount the app to the DOM