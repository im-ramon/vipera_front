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
import HeaderComponent from '@/components/layouts/HeaderComponent.vue';
import FooterComponent from '@/components/layouts/FooterComponent.vue';
import SidebarComponent from '@/components/layouts/SidebarComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  },
};
</script>

<style scoped>
@keyframes show {
  0% {
    opacity: 0;
    /* transform: translateX(-6em); */
  }

  100% {
    opacity: 1;
    /* transform: translateX(0); */
  }
}

.home-enter-active {
  animation-name: show;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}
.home-leave-active {
  animation-name: show;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-direction: reverse;
}
</style>
