<template>
  <PageArea>
    <template v-slot:titulo> Registrar presença </template>
    <template v-slot:body>
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
        <button id="btn-cadastrar_usuario">Consultar</button>
      </form>
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
