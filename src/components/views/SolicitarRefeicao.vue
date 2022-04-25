<template>
  <div id="consulta-area">
    <ModalSolicitarRefeicao v-if="modal">
      <img src="svg/x.svg" alt="barcode" class="btn_fechar" @click="modal = false" />
    </ModalSolicitarRefeicao>
    <h1 class="titulo">Solicitar refeição</h1>
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
    </form>

    <button id="btn-cadastrar_usuario" @click="modal = true">Consultar</button>
  </div>
</template>

<script>
import ModalSolicitarRefeicao from '../layouts/Modals/ModalSolicitarRefeicao.vue';

export default {
  name: 'App',
  components: {
    ModalSolicitarRefeicao,
  },
  data() {
    return {
      modal: false,
    };
  },
};
</script>

<style></style>
