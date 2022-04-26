<template>
  <PageArea>
    <template v-slot:titulo> Gerenciar usuário </template>
    <template v-slot:body>
      <form>
        <div class="form-item">
          <label for="nome_usuario">Nome completo:</label>
          <input type="text" id="nome_usuario" />
        </div>

        <div class="form-item identificacao">
          <label for="identificacao">Identificação:</label>
          <input type="text" id="identificacao" />
          <img src="svg/barcode.svg" alt="barcode" />
        </div>

        <div class="form-item">
          <label for="data_de_nascimento">Data de nascimento:</label>
          <input type="date" id="data_de_nascimento" />
        </div>
        <div class="form-item">
          <label for="tipo_de_refeicao">Classificação:</label>
          <select name="tipo_de_refeicao" id="tipo_de_refeicao">
            <option value="n">Comum</option>
            <option value="a">Pessoal de Apoio</option>
            <option value="1">Criança até 1 ano</option>
            <option value="12">Criança de 1 a 12 anos</option>
            <option value="i">Indígena</option>
            <option value="e">Especial</option>
          </select>
        </div>
        <button id="btn-cadastrar_usuario">Cadastrar</button>
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
