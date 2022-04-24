<template>
  <div id="consulta-area">
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

    <button id="btn-cadastrar_usuario">Consultar</button>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
