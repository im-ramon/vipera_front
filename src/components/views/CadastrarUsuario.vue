<template>
  <PageArea>
    <template v-slot:titulo> Cadastrar usuário </template>
    <template v-slot:body>
      <transition name="fade">
        <ModalConfirmacao v-if="modalAtivo" :backgourndModal="backgourndModal">
          <img src="svg/x.svg" @click="modalAtivo = false" class="button-fechar" alt="Fechar" />
          <h3>{{ modal_titulo }}</h3>
          <p>{{ modal_conteudo }}</p>
        </ModalConfirmacao>
      </transition>

      <form>
        <div class="form-item">
          <label for="nome">Nome completo:</label>
          <input type="text" id="nome" v-model="nome" />
        </div>

        <div class="form-item">
          <label for="data_de_nascimento">Data de nascimento:</label>
          <input type="date" id="data_de_nascimento" v-model="data_de_nascimento" />
        </div>

        <div class="form-item">
          <label for="classificacao">Classificação:</label>
          <select name="classificacao" id="classificacao" v-model="classificacao">
            <ClassificacaoUsuario></ClassificacaoUsuario>
          </select>
        </div>

        <div class="form-item">
          <label for="tipo_alimentacao">Tipo de alimentação:</label>
          <select name="tipo_alimentacao" id="tipo_alimentacao" v-model="tipo_alimentacao">
            <option value="normal">Normal</option>
            <option value="especial">Especial</option>
          </select>
        </div>

        <div class="form-item" v-show="tipo_alimentacao == 'especial'">
          <label for="observacoes">Observações:</label>
          <input type="text" id="observacoes" v-model="observacoes" />
        </div>

        <div class="form-item identificacao">
          <label for="identificacao">Identificação:</label>
          <input type="text" id="identificacao" v-model="identificacao" required />
          <img src="svg/barcode.svg" alt="barcode" />
        </div>
        <div class="button_area">
          <button v-on:click.prevent="cadastrarUsuario()" class="button-large">
            <div class="button_text">
              <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
              <span :class="!loading || 'hidden'">Cadastrar</span>
            </div>
          </button>
          <button v-on:click.prevent="limparFormInicial()" class="button-large button-large-delete">
            <div class="button_text">
              <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
              <span :class="!loading || 'hidden'">Limpar formulário</span>
            </div>
          </button>
        </div>
      </form>
    </template>
  </PageArea>
</template>

<script>
import ClassificacaoUsuario from '@/components/layouts/options/ClassificacaoUsuario.vue';
import PageArea from '@/components/layouts/PageArea.vue';
import ModalConfirmacao from '@/components/layouts/Modals/ModalConfirmacao.vue';
import axios from 'axios';

export default {
  data() {
    return {
      nome: '',
      identificacao: '',
      data_de_nascimento: '2000-01-01',
      classificacao: '-',
      tipo_alimentacao: 'normal',
      observacoes: '',
      loading: false,
      modalAtivo: false,
      backgourndModal: 'background_success',
      modal_titulo: '-',
      modal_conteudo: '-',
    };
  },
  methods: {
    limparFormInicial() {
      this.nome = '';
      this.identificacao = '';
      this.data_de_nascimento = '2000-01-01';
      this.classificacao = '-';
      this.tipo_alimentacao = 'normal';
      this.observacoes = '';
    },
    cadastrarUsuario() {
      if (this.nome && this.identificacao && this.data_de_nascimento && this.classificacao != '-') {
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
              observacoes: !this.observacoes ? 'Não há' : this.observacoes,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then((r) => {
            this.abrirModal('success', 'Tudo certo por aqui!', `O usuário *${r.data.nome}* foi salvo no banco de dados com sucesso!`);
            this.limparForm();
          })
          .catch((e) => {
            if (e.response.data && e.response.data.message) {
              if (e.response.data.message.includes('[23000]')) {
                this.abrirModal('error', 'Desculpe, algo deu errado...', `O número de identificação *${this.identificacao}* já está cadastrado no banco de dados. Por favor, verifique o número digitado ou insira um novo.`);
              }
            } else {
              this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível salvar o usuário no banco de dados, tente novamente. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e}*`);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.abrirModal('warning', 'Atenção!', 'Preenchar todos os campos corretamente para continuar.');
      }
    },
    limparForm() {
      this.nome = '';
      this.identificacao = '';
      this.data_de_nascimento = '2000-01-01';
      this.classificacao = '-';
      this.tipo_alimentacao = 'normal';
      this.observacoes = '';
      this.loading = false;
    },
    abrirModal(tipo, titulo, conteudo) {
      this.backgourndModal = 'background_' + tipo;
      this.modal_titulo = titulo;
      this.modal_conteudo = conteudo;
      this.modalAtivo = true;
    },
  },
  components: {
    PageArea,
    ModalConfirmacao,
    ClassificacaoUsuario,
  },
};
</script>

<style></style>
