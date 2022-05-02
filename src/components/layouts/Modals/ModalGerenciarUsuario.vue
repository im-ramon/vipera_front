<template>
  <div id="modal_consulta">
    <div id="modal-area">
      <slot></slot>
      <h1 class="titulo">Gerenciar usuário</h1>
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
          <span id="idade">Idade: <strong>___ ano(s)</strong></span>
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
        <div class="button_area">
          <button v-on:click.prevent class="button-large">Salvar dados</button>
          <button v-on:click.prevent="excluirUsuario('Id do usuário', 'Nome do usuário')" class="button-large button-large-delete">Excluir usuário</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    excluirUsuario(id, nome) {
      let confirm = window.confirm(`Você irá excluir o usuário ${nome} PERMANENTEMENTE do banco de dados.\n\nRealmente deseja continuar?`);
      if (confirm) {
        alert(`Implementar lógica aqui para excluir o Id: ${id}`);
      }
    },
  },
  props: {
    teste: {
      required: false,
      default: 'Lucas',
    },
  },
};
</script>

<style></style>
