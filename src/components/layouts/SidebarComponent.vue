<template>
  <aside>
    <div id="logo">
      <img src="svg/e.svg" alt="Logo 'E'" />
      <span>e-numer</span>
    </div>
    <div id="links">
      <router-link to="/" class="links-item">
        <img src="/svg/home.svg" alt="Home" />
        <span>Página inicial</span>
      </router-link>
      <router-link to="/cadastrarusuario" class="links-item">
        <img src="/svg/user-add.svg" alt="Cadastrar usuário" />
        <span>Cadastrar usuário</span>
      </router-link>
      <router-link to="/solicitarrefeicao" class="links-item">
        <img src="/svg/clipboard.svg" alt="Solicitações de refeição" />
        <span>Solicitar refeição</span>
      </router-link>
      <router-link to="/registrarpresenca" class="links-item">
        <img src="/svg/user-check.svg" alt="Registrar presença" />
        <span>Registrar presença</span>
      </router-link>
      <router-link to="/visualizarestatisticas" class="links-item">
        <img src="/svg/chart-bar.svg" alt="Estatísticas" />
        <span>Estatísticas</span>
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
};
</script>

<style></style>
