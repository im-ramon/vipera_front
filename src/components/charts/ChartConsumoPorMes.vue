<template>
  <canvas id="consumo_mes-chart"></canvas>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'PlanetChart',
  data() {
    return {
      ano: 2022,
      jan: 1,
      fev: 1,
      mar: 1,
      abr: 1,
      mai: 1,
      jun: 1,
      jul: 1,
      ago: 1,
      set: 1,
      out: 1,
      nov: 1,
      dez: 1,
    };
  },
  computed: {
    monthChartData() {
      return {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [
            // {
            //   data: [400, 500, 330, 219, 620, 510, 375, 450, 300, 590, 500, 150],
            //   label: 'Quantidade de refeições consumidas',
            // backgroundColor: 'rgba(54,73,93,.5)',
            //   borderColor: '#18e78a',
            //   borderWidth: 1,
            // },
            {
              label: 'Quantidade de refeições solicitadas',
              data: [this.jan, this.fev, this.mar, this.abr, this.mai, this.jun, this.jul, this.ago, this.set, this.out, this.nov, this.dez],
              borderColor: '#36495d',
              backgroundColor: 'rgba(71, 183,132,1)',
              borderWidth: 1,
              //   type: 'bar',
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
      };
    },
  },
  methods: {
    recuperarEstatisticas() {
      this.loading = true;
      axios
        .get(process.env.VUE_APP_URL_BASE_API + `api/estatisticas/${this.ano}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((r) => {
          const mes = r.data.refeicoes.mes;
          this.jan = mes.jan;
          this.fev = mes.fev;
          this.mar = mes.mar;
          this.abr = mes.abr;
          this.mai = mes.mai;
          this.jun = mes.jun;
          this.jul = mes.jul;
          this.ago = mes.ago;
          this.set = mes.set;
          this.out = mes.out;
          this.nov = mes.nov;
          this.dez = mes.dez;

          // Montando o gráfico
          const ctx = document.getElementById('consumo_mes-chart');
          new Chart(ctx, this.monthChartData);
          //   console.log(r.data.refeicoes.mes);
        })
        .catch((e) => {
          console.log('Ocorreu um erro ao tentar acessar as estatísticas. Mensagem: ' + e);
        });
    },
  },
  mounted() {
    this.recuperarEstatisticas();
  },
};
</script>
