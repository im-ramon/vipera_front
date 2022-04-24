<template>
  <HeaderComponent></HeaderComponent>
  <main>
    <section id="root">
      <router-link class="botaotemporario" to="/">Página Inicial</router-link>
      <router-view></router-view>
    </section>
  </main>
  <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import FooterComponent from './components/layouts/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
.botaotemporario {
  margin: 2em;
  grid-column: 1 / 3;
}

main #root {
  flex-direction: column;
}
</style>
