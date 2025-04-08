<template>
  <div class="sidebar bg-stone-800 w-56 p-4">
    <h2 class="text-white text-lg font-bold mb-4">Tools</h2>
    <button class="bg-blue-500 text-white px-4 py-2 rounded w-full" @click="isModalOpen = true">
      + Add Block
    </button>
    <Modal v-if="isModalOpen" @close="isModalOpen = false" @add-block="addBlock" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "./Modal.vue";

const isModalOpen = ref(false);
const addBlock = (blockData) => {
  emit("add-block", blockData);
  isModalOpen.value = false;
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
button {
  cursor: pointer;
  transition: background 0.3s;
}
button:hover {
  background-color: #2563eb;
}
</style>
