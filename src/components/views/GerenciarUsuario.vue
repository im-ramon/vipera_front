<template>
  <PageArea>
    <template v-slot:titulo> Gerenciar usuário </template>
    <template v-slot:body>
      <ModalGerenciarUsuario v-if="modalAtivo">
        <img src="svg/x.svg" alt="barcode" class="button-fechar" @click="modalAtivo = false" />
      </ModalGerenciarUsuario>
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
import PageArea from '../layouts/PageArea.vue';
import ModalGerenciarUsuario from '../layouts/Modals/ModalGerenciarUsuario.vue';

export default {
  components: {
    PageArea,
    ModalGerenciarUsuario,
  },
  data() {
    return {
      modalAtivo: false,
    };
  },
};
</script>

<style></style>
