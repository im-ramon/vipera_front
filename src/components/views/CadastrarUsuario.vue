<template>
  <PageArea>
    <template v-slot:titulo> Cadastrar usuário </template>
    <template v-slot:body>
      <transition name="fade">
        <ModalConfirmacao v-if="modalAtivo">
          <img src="svg/x.svg" @click="fecharModal()" class="button-fechar" alt="Fechar" />
          <h3>Tudo certo por aqui!</h3>
          <p>
            O usuário "<strong>{{ clienteAtual }}</strong
            >" foi cadastrado com sucesso!
          </p>
        </ModalConfirmacao>
      </transition>

      <form>
        <div class="form-item">
          <label for="nome_usuario">Nome completo:</label>
          <input type="text" id="nome_usuario" v-model="nome" />
        </div>

        <div class="form-item identificacao">
          <label for="identificacao">Identificação:</label>
          <input type="text" id="identificacao" v-model="identificacao" />
          <img src="svg/barcode.svg" alt="barcode" />
        </div>

        <div class="form-item">
          <label for="data_de_nascimento">Data de nascimento:</label>
          <input type="date" id="data_de_nascimento" v-model="data_de_nascimento" />
        </div>

        <div class="form-item">
          <label for="tipo_de_refeicao">Classificação:</label>
          <select name="tipo_de_refeicao" id="tipo_de_refeicao" v-model="classificacao">
            <option value="-" disabled>Selecione um tipo</option>
            <option value="abrigo">Civis do abrigo</option>
            <option value="apoio">Pessoal de Apoio</option>
            <option value="crianca1">Criança até 1 ano</option>
            <option value="crianca12">Criança de 1 a 12 anos</option>
          </select>
        </div>

        <div class="form-item">
          <label for="tipo_de_refeicao">Tipo de alimentação:</label>
          <select name="tipo_de_refeicao" id="tipo_de_refeicao" v-model="tipo_alimentacao">
            <option value="-" disabled>Selecione um tipo</option>
            <option value="comum">Comum</option>
            <option value="indigena">Indígena</option>
            <option value="especial">Especial</option>
          </select>
        </div>
        <button v-on:click.prevent="cadastrarUsuario()" class="button-large">
          <div class="button_text">
            <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
            <span :class="!loading || 'hidden'">Cadastrar</span>
          </div>
        </button>
      </form>
    </template>
  </PageArea>
</template>

<script>
import PageArea from '../layouts/PageArea.vue';
import ModalConfirmacao from '../layouts/Modals/ModalConfirmacao.vue';
import axios from 'axios';

export default {
  data() {
    return {
      nome: '',
      identificacao: '',
      data_de_nascimento: '2000-01-01',
      classificacao: '-',
      tipo_alimentacao: '-',
      clienteAtual: '',
      loading: false,
      modalAtivo: false,
    };
  },
  methods: {
    cadastrarUsuario() {
      if (this.nome && this.identificacao && this.data_de_nascimento && this.classificacao && this.tipo_alimentacao) {
        this.loading = true;
        axios
          .post(
            process.env.VUE_APP_URL_BASE_API + 'api/cliente',
            {
              nome: this.nome,
              identificacao: this.identificacao,
              data_de_nascimento: this.data_de_nascimento,
              classificacao: this.classificacao,
              tipo_alimentacao: this.tipo_alimentacao,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then((r) => {
            this.clienteAtual = r.data.nome;
            this.modalAtivo = true;
          })
          .catch((e) => {
            alert(e.response.data);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        alert('Preencha todos os campos adequadamente para continuar.');
      }
    },
    fecharModal() {
      this.modalAtivo = false;
      this.limparForm();
    },
    limparForm() {
      this.nome = '';
      this.identificacao = '';
      this.data_de_nascimento = '2000-01-01';
      this.classificacao = '-';
      this.tipo_alimentacao = '-';
      this.clienteAtual = '';
      this.loading = false;
    },
  },
  components: {
    PageArea,
    ModalConfirmacao,
  },
};
</script>

<style></style>
