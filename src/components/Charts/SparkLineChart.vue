<template>
  <svg class="sparkline" :width="width" :height="height" :stroke-width="stroke">
    <path class="sparkline--line" :d="shape" fill="none"></path>
    <path
      class="sparkline--fill"
      :d="[shape, fillEndPath].join(' ')"
      stroke="none"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "SparkLineChart",
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      stroke: 0.5,
      data: this.generateInitialData(), // Boshlang‘ich data
    };
  },
  computed: {
    shape() {
      const stroke = this.stroke;
      const width = this.width;
      const height = this.height - stroke * 2;
      const data = this.data || [];
      const highestPoint = Math.max(...data) + 1;
      const coordinates = [];
      const totalPoints = data.length - 1;

      data.forEach((item, n) => {
        const x = (n / totalPoints) * width + stroke;
        const y = height - (item / highestPoint) * height + stroke;
        coordinates.push({ x, y });
      });

      if (!coordinates[0]) {
        return `M 0 ${this.stroke} L 0 ${this.stroke} L ${this.width} ${this.stroke}`;
      }

      return `M${coordinates[0].x},${coordinates[0].y} ` + coordinates.map(p => `L${p.x},${p.y}`).join(" ");
    },
    fillEndPath() {
      return `V ${this.height} L 4 ${this.height} Z`;
    },
  },
  methods: {
    generateInitialData() {
      return Array.from({ length: 10 }, () => Math.floor(Math.random() * 30) + 10);
    },
    updateData() {
      const newValue = Math.max(10, Math.min(40, this.data[this.data.length - 1] + (Math.random() * 10 - 5)));
      this.data = [...this.data.slice(1), newValue];
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.updateData();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
svg {
  stroke: #1f8ceb;
  fill: rgba(31, 140, 235, 0.06);
  transition: all 0.5s ease-in-out;
}
</style>
