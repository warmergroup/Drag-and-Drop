<template>
  <div class="fixed inset-0 bg-gray-800/50 flex items-center justify-center z-40">
    <div class="modal w-96 min-h-72 border border-gray-600 bg-gray-800 text-white p-4 rounded flex flex-col justify-between">
      <div class="flex flex-col gap-2">
      <h2 class="text-lg">Choose Block Type</h2>
        <div>
          <label>
            <input type="radio" value="Image" v-model="selectedType" /> Image
          </label>
          <label>
            <input type="radio" value="Chart" v-model="selectedType" /> Diagram
          </label>
        </div>
      </div>

      <div v-if="selectedType === 'Image'" class="mb-4">
        <input type="file" @change="onFileSelect" class="block w-full bg-gray-700 p-2 rounded" />
      </div>

      <div v-if="selectedType === 'Chart'" class="flex flex-col gap-2 mb-4">
        <select v-model="selectedChart" class="bg-gray-800 border border-gray-600 p-2 rounded text-white">
          <option v-for="chart in chartTypes" :value="chart">{{ chart }}</option>
        </select>
        <input type="text" v-model="chartName" placeholder="Chart Name" class="bg-gray-800 border border-gray-600 p-2 rounded text-white" />
      </div>

      <div class="flex gap-2 justify-end">
        <button
          @click="saveBlock"
          class="bg-green-500 px-4 py-2 rounded"
          :disabled="!isValid"
        >
          Save
        </button>
        <button @click="$emit('close')" class="bg-red-500 px-4 py-2 rounded">Cancel</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

const emit = defineEmits(["add-block", "close"]);
const selectedType = ref("");
const selectedChart = ref("");
const chartName = ref("");
const file = ref(null);

const onFileSelect = (event) => {
  file.value = event.target.files[0];
};

const isValid = computed(() => {
  if (selectedType.value === "Image") {
    return file.value !== null;
  }
  if (selectedType.value === "Chart") {
    return selectedChart.value !== "" && chartName.value !== "";
  }
  return false;
});
const saveBlock = () => {
  emit("add-block", selectedType.value === "Image"
    ? { type: "Image", file: file.value }
    : { type: selectedChart.value, name: chartName.value }
  );
};

const chartTypes = ["LineChart", "BarChart", "SparkLineChart"];

</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(31, 41, 55, 0.9);
  padding: 20px;
  border-radius: 10px;
}
button {
  margin-bottom: 10px;
}
</style>
