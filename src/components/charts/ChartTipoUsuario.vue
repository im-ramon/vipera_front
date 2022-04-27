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
        type: 'pie',
        data: {
          labels: ['Comum', 'Apoio', 'Indígena', 'Especial'],
          datasets: [
            {
              label: 'Quantidade de refeições solicitadas',
              data: [400, 500, 330, 219],
              backgroundColor: ['#319957', '#fffb00', '#1a518e', '#353a40'],
              borderColor: '#12121250',
              borderWidth: 2,
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
