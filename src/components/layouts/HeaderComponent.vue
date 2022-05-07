<template>
  <header>
    <div id="data_hoje">
      <!-- <div class="calendar refeicao" title="Clique para trocar a refeição" @click="alterarRefeicao()">
        <img src="svg/food.svg" alt="Calendário" />
        <span>Refeição: {{ refeicaoAtual }}</span>
      </div> -->
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
      let semana = date.getDay();
      let mes = '-';
      let ano = date.getFullYear();
      switch (date.getMonth()) {
        case 0:
          mes = 'jan';
          break;
        case 1:
          mes = 'fev';
          break;
        case 2:
          mes = 'mar';
          break;
        case 3:
          mes = 'abr';
          break;
        case 4:
          mes = 'maio';
          break;
        case 5:
          mes = 'jun';
          break;
        case 6:
          mes = 'jul';
          break;
        case 7:
          mes = 'ago';
          break;
        case 8:
          mes = 'set';
          break;
        case 9:
          mes = 'out';
          break;
        case 10:
          mes = 'nov';
          break;
        case 11:
          mes = 'dez';
          break;

        default:
          break;
      }
      switch (semana) {
        case 1:
          semana = 'Segunda-feira';
          break;
        case 2:
          semana = 'Terça-feira';
          break;
        case 3:
          semana = 'Quarta-feira';
          break;
        case 4:
          semana = 'Quinta-feira';
          break;
        case 5:
          semana = 'Sexta-feira';
          break;
        case 6:
          semana = 'Sábado';
          break;
        case 7:
          mes = 'Domingo';
          break;

        default:
          break;
      }
      return `${dia} de ${mes} de ${ano} - ${semana}`;
    },
  },
  mounted() {
    this.verificaRefeicaoAtual();
  },
};
</script>

<style></style>
