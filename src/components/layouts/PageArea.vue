<template>
  <div class="page_area">
    <h1 class="titulo">
      <slot name="titulo"></slot>
    </h1>
    <section id="area_conteudo">
      <slot name="body"></slot>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
