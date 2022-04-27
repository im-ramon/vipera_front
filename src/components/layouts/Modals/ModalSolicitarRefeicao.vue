<template>
  <div id="modal_consulta">
    <div id="modal-area">
      <slot></slot>
      <h1 class="titulo">Solicitar refeição</h1>
      <form>
        <div class="form-item">
          <label for="nome_usuario">Nome completo:</label>
          <input type="text" id="nome_usuario" disabled />
        </div>

        <div class="form-item identificacao">
          <label for="identificacao">Identificação:</label>
          <input type="text" id="identificacao" disabled />
          <img src="svg/barcode.svg" alt="barcode" />
        </div>

        <div class="form-item">
          <label for="data_de_nascimento">Data de nascimento:</label>
          <input type="date" id="data_de_nascimento" disabled />
          <span id="idade">Idade: <strong>20 anos</strong></span>
        </div>

        <div class="form-item">
          <label for="data_consulta">Data da consulta:</label>
          <input type="date" id="data_consulta" disabled />
        </div>

        <div class="form-item">
          <label for="horario_refeicao">Horário da refeição:</label>
          <input type="text" id="horario_refeicao" disabled />
        </div>

        <div class="form-item">
          <label for="tipo_de_refeicao">Tipo de refeição:</label>
          <input type="text" id="tipo_de_refeicao" disabled />
        </div>
        <div class="form-item">
          <fieldset>
            <legend>Horário solicitados</legend>
            <div class="form-sub_item">
              <input type="checkbox" id="cafe" disabled />
              <label for="cafe">Café da manhã</label>
            </div>

            <div class="form-sub_item">
              <input type="checkbox" id="almoco" disabled />
              <label for="almoco">Almoço</label>
            </div>

            <div class="form-sub_item">
              <input type="checkbox" id="janta" disabled />
              <label for="janta">Janta</label>
            </div>
          </fieldset>
        </div>
        <button class="button-large">Registrar presença</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
