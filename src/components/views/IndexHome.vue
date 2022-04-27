<template>
  <PageArea>
    <template v-slot:titulo> Dashboard </template>
    <template v-slot:body>
      <div id="graficos">
        <div id="planet">
          <PlanetChart />
        </div>
      </div>
    </template>
  </PageArea>
</template>

<script>
import PageArea from '../layouts/PageArea.vue';
import PlanetChart from '../PlanetChart.vue';

export default {
  components: {
    PageArea,
    PlanetChart,
  },
};
</script>

<style></style>
