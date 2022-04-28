<template>
  <PageArea>
    <template v-slot:titulo> Relatórios </template>
    <template v-slot:body>
      <h3>Implementar aqui a possibilidade de gerar relatórios, de acordo com a necessedidade.</h3>
      <button class="button-large">Atualizar relatórios</button>
    </template>
  </PageArea>
</template>

<script>
import PageArea from '../layouts/PageArea.vue';
export default {
  components: {
    PageArea,
  },
};
</script>

<style></style>
