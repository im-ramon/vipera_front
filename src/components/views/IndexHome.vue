<template>
  <PageArea>
    <template v-slot:titulo> Dashboard </template>
    <template v-slot:body>
      <div id="graficos">
        <div id="grafico-1" class="grafico-item">
          <h5>Total de refeições cadastradas</h5>
          <h2>3.500</h2>
        </div>

        <div id="grafico-2" class="grafico-item">
          <h5>Total de usuários cadastradas</h5>
          <h2>728</h2>
        </div>

        <div id="grafico-3" class="grafico-item">
          <h5>Refeições solicitadas para hoje</h5>
          <span>Café da manhã: <strong>28</strong></span>
          <span>Almoço:<strong>650</strong></span>
          <span>Janta:<strong>381</strong></span>
        </div>

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
import PageArea from '../layouts/PageArea.vue';
import ChartConsumoPorMes from '../charts/ChartConsumoPorMes.vue';
import ChartTipoUsuario from '../charts/ChartTipoUsuario.vue';

export default {
  components: {
    PageArea,
    ChartConsumoPorMes,
    ChartTipoUsuario,
  },
};
</script>

<style></style>
