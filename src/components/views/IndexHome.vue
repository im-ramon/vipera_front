<template>
  <PageArea>
    <template v-slot:titulo> Dashboard </template>
    <template v-slot:body>
      <h3>Bem vindo!</h3>
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
