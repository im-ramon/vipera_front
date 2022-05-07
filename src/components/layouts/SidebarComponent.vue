<template>
  <aside>
    <div id="logo">
      <router-link to="/" id="logo_area">
        <img src="logo.png" alt="Logo 'E'" />
        <span>Vipera</span>
      </router-link>
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
      <router-link to="/gerenciarusuario" class="links-item">
        <img src="/svg/user-edit.svg" alt="Cadastrar usuário" />
        <span>Gerenciar usuários</span>
      </router-link>
      <router-link to="/solicitarrefeicao" class="links-item">
        <img src="/svg/clipboard.svg" alt="Solicitações de refeição" />
        <span>Solicitar refeição</span>
      </router-link>
      <router-link to="/registrarpresenca" class="links-item">
        <img src="/svg/user-check.svg" alt="Registrar presença" />
        <span>Registrar presença</span>
      </router-link>
      <router-link to="/visualizarrelatorios" class="links-item">
        <img src="/svg/chart-bar.svg" alt="Relatórios" />
        <span>Relatórios</span>
      </router-link>
    </div>
    <div id="app_version">
      <!-- <img id="dev-logo" src="@/assets/logo-black.png" alt="Logo Pequen" /> -->
      <div id="app_version_area">
        <p>Web App <strong>Vipera</strong></p>
        <p>Todos os direitos reservados © {{ anoAtual }}</p>
        <p id="dev">
          Desenvolvido por
          <a href="https://api.whatsapp.com/send?phone=+5575991357677&text=Olá%20,%20Ramon@" target="_BLANK" title="Entrar em contato pelo Whatsapp"> <strong>Ramon Oliveira</strong></a>
        </p>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
  computed: {
    anoAtual() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style></style>
