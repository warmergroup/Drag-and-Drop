<script setup>
import { ref } from "vue";
import { GridLayout, GridItem } from "vue3-grid-layout";
import BlockComponent from "./components/BlockComponent.vue";
import Sidebar from "./components/Sidebar.vue";

const layout = ref([
  { x: 0, y: 0, w: 4, h: 3, i: "0", title: "SparkLine", component: "SparkLineChart" },
  { x: 4, y: 0, w: 10, h: 3, i: "1", title: "Line Chart", component: "LineChart" },
  { x: 4, y: 1, w: 10, h: 3, i: "2", title: "Bar Chart", component: "BarChart" }
]);
``
const addBlock = (blockData) => {
  layout.value.push({
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    i: `${layout.value.length}`,
    title: blockData.name || "New Block",
    component: blockData.type || "SparkLineChart",
  });
};
</script>

<template>
  <div class="flex min-h-screen bg-neutral-900">
    <Sidebar @add-block="addBlock" />

    <div class="flex-1 p-4">
      <GridLayout
        v-model:layout="layout"
        :col-num="14"
        :row-height="60"
        :is-draggable="true"
        :is-resizable="true"
        :margin="[10, 10]"
      >
        <GridItem
          v-for="block in layout"
          :key="block.i"
          v-bind="block"
          :min-w="4"
          :min-h="2"
        >
          <BlockComponent :block="block" />
        </GridItem>
      </GridLayout>
    </div>
  </div>
</template>
