<template>
  <header>
    <div id="data_hoje">
      <div class="calendar refeicao" title="Clique para trocar a refeição" @click="alterarRefeicao()">
        <img src="svg/food.svg" alt="Calendário" />
        <span>Refeição: {{ refeicaoAtual }}</span>
      </div>
      <div class="calendar">
        <img src="svg/calendar.svg" alt="Calendário" />
        <span>{{ dataHoje }}</span>
      </div>
    </div>

    <nav>
      <img src="svg/menu.svg" id="btn_menu_ajuda" alt="Menu" @click="menuAtivo = !menuAtivo" />
      <div id="nav-itens" v-if="menuAtivo">
        <span>Bem vindo, Ramon!</span>
        <a href="#">Ajuda</a>
        <a href="#">Meu perfil</a>
        <a href="#" class="bg-danger-soft">Sair</a>
        <hr />
        <span id="version">Versão 1.1.0 | Alpha</span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      refeicaoAtual: '-',
      menuAtivo: false,
    };
  },

  methods: {
    verificaRefeicaoAtual() {
      if (localStorage.getItem('refeicaoAtual')) {
        this.refeicaoAtual = localStorage.getItem('refeicaoAtual');
      } else {
        this.refeicaoAtual = 'Café da manhã';
      }
    },
    alterarRefeicao() {
      if (this.refeicaoAtual == 'Café da manhã') {
        localStorage.setItem('refeicaoAtual', 'Almoço');
        this.refeicaoAtual = 'Almoço';
      } else if (this.refeicaoAtual == 'Almoço') {
        localStorage.setItem('refeicaoAtual', 'Jantar');
        this.refeicaoAtual = 'Jantar';
      } else if (this.refeicaoAtual == 'Jantar') {
        localStorage.setItem('refeicaoAtual', 'Café da manhã');
        this.refeicaoAtual = 'Café da manhã';
      }
    },
  },
  computed: {
    dataHoje() {
      let date = new Date();
      let dia = date.getDate();
      let mes = '-';
      let ano = date.getFullYear();
      switch (date.getMonth()) {
        case 0:
          mes = 'Jan';
          break;
        case 1:
          mes = 'Fev';
          break;
        case 2:
          mes = 'Mar';
          break;
        case 3:
          mes = 'Abr';
          break;
        case 4:
          mes = 'Maio';
          break;
        case 5:
          mes = 'Jun';
          break;
        case 6:
          mes = 'Jul';
          break;
        case 7:
          mes = 'Ago';
          break;
        case 8:
          mes = 'Set';
          break;
        case 9:
          mes = 'Out';
          break;
        case 10:
          mes = 'Nov';
          break;
        case 11:
          mes = 'Dez';
          break;

        default:
          break;
      }
      return `${dia} ${mes} ${ano}`;
    },
  },
  mounted() {
    this.verificaRefeicaoAtual();
  },
};
</script>

<style></style>
