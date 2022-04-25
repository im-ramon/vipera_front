<template>
  <SidebarComponent></SidebarComponent>
  <main>
    <HeaderComponent></HeaderComponent>
    <section id="root">
      <router-view></router-view>
    </section>
    <FooterComponent></FooterComponent>
  </main>
</template>

<script>
import HeaderComponent from './components/layouts/HeaderComponent.vue';
import FooterComponent from './components/layouts/FooterComponent.vue';
import SidebarComponent from './components/layouts/SidebarComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  },
};
</script>

<style></style>
