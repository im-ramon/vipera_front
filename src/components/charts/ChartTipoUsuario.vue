<template>
  <canvas id="tipo_usuario-chart"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'tipoUsuario',
  data() {
    return {
      tipoUsuarioData: {
        type: 'doughnut',
        data: {
          labels: ['Comum', 'Apoio', 'Indígena', 'Especial', 'Extra'],
          datasets: [
            {
              label: 'Quantidade de refeições solicitadas',
              data: [500, 400, 310, 219, 60],
              backgroundColor: ['#31995799', '#fffb0099', '#1a518e99', '#353a4099', '#ff000099'],
              borderColor: '#12121250',
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            fontSize: 14,
            position: 'top',
            text: 'Classificação de usuários cadastrados',
          },
          responsive: true,
          aspectRatio: 1 / 1.7,
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
    const ctx = document.getElementById('tipo_usuario-chart');
    new Chart(ctx, this.tipoUsuarioData);
  },
};
</script>
