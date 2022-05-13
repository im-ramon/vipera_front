<template>
  <PageArea>
    <template v-slot:titulo> Dashboard {{ $store.state.count }} </template>
    <template v-slot:body>
      <div id="graficos">
        <div id="grafico-1" class="grafico-item">
          <h4>Total de refeições cadastradas</h4>
          <h2>
            <img v-if="loading" src="/svg/animated_loading.svg" alt="loading" />
            <span v-else>{{ totalRefeicoes }}</span>
          </h2>
        </div>

        <div id="grafico-2" class="grafico-item">
          <h4>Total de usuários cadastradas</h4>
          <h2>
            <img v-if="loading" src="/svg/animated_loading.svg" alt="loading" />
            <span v-else>{{ totalUsuarios }}</span>
          </h2>
        </div>

        <!-- <div id="grafico-3" class="grafico-item">
          <h5>Refeições solicitadas para hoje</h5>
          <span>Café da manhã: <strong>28</strong></span>
          <span>Almoço:<strong>650</strong></span>
          <span>Janta:<strong>381</strong></span>
        </div> -->

        <div id="grafico-4" class="grafico-item">
          <ChartTipoUsuario />
        </div>

        <div id="grafico-5" class="grafico-item">
          <ChartConsumoPorMes />
        </div>

        <div id="grafico-6" class="grafico-item"></div>
      </div>
    </template>
  </PageArea>
</template>

<script>
import PageArea from '@/components/layouts/PageArea.vue';
import ChartConsumoPorMes from '@/components/charts/ChartConsumoPorMes.vue';
import ChartTipoUsuario from '@/components/charts/ChartTipoUsuario.vue';
import axios from 'axios';

export default {
  data() {
    return {
      totalRefeicoes: 0,
      totalUsuarios: 0,
      loading: false,
    };
  },
  components: {
    PageArea,
    ChartConsumoPorMes,
    ChartTipoUsuario,
  },
  computed: {
    ano() {
      let data = new Date();
      return data.getFullYear();
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
          this.totalRefeicoes = r.data.refeicoes.total;
          this.totalUsuarios = r.data.clientes.total;
          this.loading = false;
        })
        .catch((e) => {
          console.log('Ocorreu um erro ao tentar acessar as estatísticas. Mensagem: ' + e);
          this.totalRefeicoes = '-';
          this.totalUsuarios = '-';
          this.loading = false;
        });
    },
  },
  mounted() {
    this.recuperarEstatisticas();
  },
};
</script>

<style scoped>
h2 img {
  width: 20px;
}
</style>
