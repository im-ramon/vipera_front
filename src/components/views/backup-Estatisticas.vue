<template>
  <PageArea>
    <template v-slot:titulo> Relatórios </template>
    <template v-slot:body>
      <div id="estisticas-container">
        <div id="estisticas_hoje">
          <h1>Estatísticas para hoje - 21/04/2022</h1>
          <div class="estisticas-tabela">
            <span class="estisticas-tabela-cabecalho">TIPO</span>
            <span class="estisticas-tabela-cabecalho">Café</span>
            <span class="estisticas-tabela-cabecalho">Almoço</span>
            <span class="estisticas-tabela-cabecalho">Janta</span>
            <span class="estisticas-tabela-cabecalho">Total</span>

            <span>Comum</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Pessoal de Apoio</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Criança até 1 ano</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Criança de 1 a 12 anos</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Indígena</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Especial</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Total</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>1250</span>
          </div>
        </div>
        <div id="estisticas_amanha">
          <h1>Estatísticas para amannhã 22/04/2022</h1>
          <div class="estisticas-tabela">
            <span class="estisticas-tabela-cabecalho">TIPO</span>
            <span class="estisticas-tabela-cabecalho">Café</span>
            <span class="estisticas-tabela-cabecalho">Almoço</span>
            <span class="estisticas-tabela-cabecalho">Janta</span>
            <span class="estisticas-tabela-cabecalho">Total</span>

            <span>Comum</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Pessoal de Apoio</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Criança até 1 ano</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Criança de 1 a 12 anos</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Indígena</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Especial</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>350</span>

            <span>Total</span>
            <span>300</span>
            <span>15</span>
            <span>1</span>
            <span>1250</span>
          </div>
        </div>
      </div>
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
