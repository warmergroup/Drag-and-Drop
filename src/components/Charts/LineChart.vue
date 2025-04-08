<template>
  <canvas ref="chartCanvas" role="img"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'LineChart',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    this.createChart();
  },
  watch: {
    width(newWidth) {
      this.updateChartSize(newWidth, this.height);
    },
    height(newHeight) {
      this.updateChartSize(this.width, newHeight);
    }
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [...Array(10).keys()],
          datasets: [{
            label: 'Line Chart',
            data: [10, 35, 65, 25, 30, 40, 35, 100, 10, 45],
            borderColor: 'yellow',
            borderWidth: 1,
            tension: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          }
        }
      });
    },
    updateChartSize(width, height) {
      if (this.chartInstance) {
        const canvas = this.$refs.chartCanvas;

        // Canvasning yangi kengligi va balandligini CSS orqali yangilash
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Diagramma o‘lchamlarini aniqlash
        this.chartInstance.options.plugins.legend.position = "top"; // Aspektni o‘zgartirishga yordam beradi
        this.chartInstance.resize();
      }
    }

  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
</script>


<style scoped>
canvas {
  min-width: 300px; /* Minimal kenglik */
  min-height: 150px; /* Minimal balandlik */
  display: block; /* Canvasning ichki to‘liq ko‘rinishi uchun */
}
</style>