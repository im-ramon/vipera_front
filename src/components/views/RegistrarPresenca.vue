<template>
  <PageArea>
    <template v-slot:titulo> Registrar presença </template>
    <template v-slot:body>
      <ModalRegistrarPresenca v-if="modalAtivo">
        <img src="svg/x.svg" class="button-fechar" alt="Fechar" @click="modalAtivo = false" />
      </ModalRegistrarPresenca>
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
        <button class="button-large" @click="modalAtivo = true">Consultar</button>
      </form>
    </template>
  </PageArea>
</template>

<script>
import PageArea from '../layouts/PageArea.vue';
import ModalRegistrarPresenca from '../layouts/Modals/ModalRegistrarPresenca.vue';

export default {
  data() {
    return {
      modalAtivo: false,
    };
  },
  components: {
    PageArea,
    ModalRegistrarPresenca,
  },
};
</script>

<style></style>
