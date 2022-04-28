<template>
  <PageArea>
    <template v-slot:titulo> Solicitar refeição </template>
    <template v-slot:body>
      <ModalSolicitarRefeicao v-if="modalAtivo">
        <img src="svg/x.svg" alt="barcode" class="button-fechar" @click="modalAtivo = false" />
      </ModalSolicitarRefeicao>
      <form>
        <div class="form-item identificacao">
          <label for="identificacao">Identificação:</label>
          <input type="text" id="identificacao" autofocus />
          <img src="svg/barcode.svg" alt="barcode" />
        </div>
        <h3 style="text-align: center">ou</h3>
        <br />

        <div class="form-item identificacao">
          <label for="identificacao">Nome completo:</label>
          <input type="text" id="identificacao" autofocus />
        </div>

        <div class="form-item identificacao">
          <label for="identificacao">Data de nascimento:</label>
          <input type="date" id="identificacao" autofocus />
        </div>
        <button class="button-large" v-on:click.prevent="modalAtivo = true">Consultar</button>
      </form>
    </template>
  </PageArea>
</template>

<script>
import ModalSolicitarRefeicao from '../layouts/Modals/ModalSolicitarRefeicao.vue';
import PageArea from '../layouts/PageArea.vue';

export default {
  name: 'App',
  components: {
    ModalSolicitarRefeicao,
    PageArea,
  },
  data() {
    return {
      modalAtivo: false,
    };
  },
};
</script>

<style></style>
