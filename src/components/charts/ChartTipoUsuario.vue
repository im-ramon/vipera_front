<template>
  <canvas id="tipo_usuario-chart"></canvas>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
  name: 'tipoUsuario',
  data() {
    return {
      comum: 1,
      apoio: 1,
      indigena: 2,
      crianca_menos1: 1,
      crianca_1a12: 1,
    };
  },
  computed: {
    ano() {
      let data = new Date();
      return data.getFullYear();
    },
    tipoUsuarioData() {
      return {
        type: 'doughnut',
        data: {
          labels: ['Comum', 'Apoio', 'Indígena', 'Crianças até 1 ano', 'Crianças entre 1 e 12 anos'],
          datasets: [
            {
              label: 'Quantidade de refeições solicitadas',
              data: [this.comum, this.apoio, this.indigena, this.crianca_menos1, this.crianca_1a12],
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
          this.comum = r.data.clientes.tipo_normal;
          this.apoio = r.data.clientes.tipo_apoio;
          this.indigena = r.data.clientes.tipo_indigena;
          this.crianca_menos1 = r.data.clientes.tipo_criancasate1;
          this.crianca_1a12 = r.data.clientes.tipo_criancasde1a12;

          // Montando o gráfico
          const ctx = document.getElementById('tipo_usuario-chart');
          new Chart(ctx, this.tipoUsuarioData);
          //   console.log(r.data);
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
