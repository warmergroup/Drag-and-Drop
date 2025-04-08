<template>
  <div class="block flex bg-stone-800">
    <div class="drag-handle cursor-move border-b">
      <h1 class="text-white text-center bg-stone-700 w-full rounded-sm my-1">{{ block.title }}</h1>
    </div>
    <div class="content">
      <component :is="components[block.component]" v-bind="block.props" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import LineChart from "./Charts/LineChart.vue";
import SparkLineChart from "./Charts/SparkLineChart.vue";
import BarChart from "./Charts/BarChart.vue";

const components = {
  LineChart,
  SparkLineChart,
  BarChart,
};
defineProps({ block: Object });

</script>

<style>
  .block {
    width: 100%;
    height: 100%;
    cursor: default;
    display: flex;
    flex-direction: column;
    min-width: 200px; /* ✅ Minimal kenglik */
    min-height: 100px; /* ✅ Minimal balandlik */
    overflow: hidden;
    position: relative; /* 🟢 Bu kerak */
  }
</style>

