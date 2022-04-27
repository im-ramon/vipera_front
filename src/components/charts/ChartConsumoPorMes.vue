<template>
  <canvas id="consumo_mes-chart"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'PlanetChart',
  data() {
    return {
      planetChartData: {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            {
              label: 'Quantidade de refeições consumidas',
              data: [356, 499, 330, 159, 610, 500, 175, 250, 200, 490, 350, 80],
              backgroundColor: 'rgba(71, 183,132,1)',
              borderColor: '#18e78a',
              borderWidth: 3,
            },
            {
              label: 'Quantidade de refeições solicitadas',
              data: [400, 500, 330, 219, 620, 510, 375, 450, 300, 590, 500, 150],
              backgroundColor: 'rgba(54,73,93,.5)',
              borderColor: '#36495d',
              borderWidth: 3,
              type: 'bar',
            },
          ],
        },
        options: {
          title: {
            display: true,
            fontSize: 14,
            position: 'top',
            text: 'Quantidade de refeições solicitadas e consumidas por mês',
          },
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById('consumo_mes-chart');
    new Chart(ctx, this.planetChartData);
  },
};
</script>
