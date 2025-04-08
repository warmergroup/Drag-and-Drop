<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'BarChart',
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
        type: 'bar',
        data: {
          labels: [...Array(10).keys()],
          datasets: [{
            label: 'Bar Chart',
            data: [10, 35, 65, 100, 30, 40, 35, 5, 45, 80],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderWidth: .7,
            tension: 3
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