<template>
  <PageArea>
    <template v-slot:titulo> Gerenciar usuário </template>
    <template v-slot:body>
      <transition name="fade">
        <ModalConfirmacao v-if="modalConfirmacaoAtivo" :backgourndModal="backgourndModal">
          <img src="svg/x.svg" @click="modalConfirmacaoAtivo = false" class="button-fechar" alt="Fechar" />
          <h3>{{ modal_titulo }}</h3>
          <p>{{ modal_conteudo }}</p>
        </ModalConfirmacao>
      </transition>

      <div id="modal_consulta" v-if="modalAtivo">
        <div id="modal-area">
          <img src="svg/x.svg" alt="barcode" class="button-fechar" @click="modalAtivo = false" />
          <h1 class="titulo">Gerenciar usuário</h1>
          <form>
            <div class="form-item">
              <label for="nome">Nome completo:</label>
              <input type="text" id="nome" v-model="novo_nome" />
            </div>

            <div class="form-item">
              <label for="data_de_nascimento">Data de nascimento:</label>
              <input type="date" id="data_de_nascimento" v-model="novo_data_de_nascimento" />
            </div>

            <div class="form-item">
              <label for="tipo_de_refeicao">Classificação:</label>
              <select name="tipo_de_refeicao" id="tipo_de_refeicao" v-model="novo_classificacao">
                <ClassificacaoUsuario></ClassificacaoUsuario>
              </select>
            </div>

            <div class="form-item">
              <label for="tipo_alimentacao">Tipo de alimentação:</label>
              <select name="tipo_alimentacao" id="tipo_alimentacao" v-model="novo_tipo_alimentacao">
                <option value="normal">Normal</option>
                <option value="especial">Especial</option>
              </select>
            </div>

            <div class="form-item" v-show="novo_tipo_alimentacao == 'especial'">
              <label for="observacoes">Observações:</label>
              <input type="text" id="observacoes" v-model="novo_observacoes" />
            </div>

            <div class="form-item identificacao">
              <label for="identificacao">Identificação:</label>
              <input type="text" id="identificacao" v-model="novo_identificacao" />
              <img src="svg/barcode.svg" alt="barcode" />
            </div>

            <div class="button_area">
              <button v-on:click.prevent="atualizarUsuario()" class="button-large">
                <div class="button_text">
                  <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
                  <span :class="!loading || 'hidden'">Atualizar dados</span>
                </div>
              </button>

              <button v-on:click.prevent="deletarUsuario()" class="button-large button-large-delete">
                <div class="button_text">
                  <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
                  <span :class="!loading || 'hidden'">Excluir usuário</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      <form>
        <div class="form-item identificacao">
          <label for="identificacao">Identificação:</label>
          <input type="text" id="identificacao" v-model="identificacao" :disabled="nome.length > 0" />
          <img src="svg/barcode.svg" alt="barcode" />
        </div>
        <h3 style="text-align: center">ou</h3>
        <br />

        <div class="form-item identificacao">
          <label for="identificacao">Nome completo:</label>
          <input type="text" id="identificacao" v-model="nome" :disabled="identificacao.length > 0" />
        </div>

        <div class="form-item identificacao">
          <label for="identificacao">Data de nascimento:</label>
          <input type="date" id="identificacao" v-model="data_de_nascimento" :disabled="identificacao.length > 0" />
        </div>

        <div class="button_area">
          <button v-on:click.prevent="encontarUsuario()" class="button-large">
            <div class="button_text">
              <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
              <span :class="!loading || 'hidden'">Consultar</span>
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
import axios from 'axios';
import PageArea from '../layouts/PageArea.vue';
import ModalConfirmacao from '../layouts/Modals/ModalConfirmacao.vue';
import ClassificacaoUsuario from '../layouts/options/ClassificacaoUsuario.vue';

export default {
  components: {
    PageArea,
    ModalConfirmacao,
    ClassificacaoUsuario,
  },
  data() {
    return {
      identificacao: '',
      nome: '',
      data_de_nascimento: '2000-01-01',
      modalAtivo: false,
      loading: false,
      id: 0,
      novo_nome: '',
      novo_identificacao: '',
      novo_data_de_nascimento: '2000-01-01',
      novo_classificacao: '-',
      novo_tipo_alimentacao: '-',
      novo_observacoes: '-',
      modalConfirmacaoAtivo: false,
      modal_titulo: '',
      modal_conteudo: '',
      backgourndModal: 'background_success',
    };
  },
  methods: {
    limparFormInicial() {
      this.identificacao = '';
      this.nome = '';
      this.data_de_nascimento = '2000-01-01';
    },
    abrirModal(tipo, titulo, conteudo) {
      this.backgourndModal = 'background_' + tipo;
      this.modal_titulo = titulo;
      this.modal_conteudo = conteudo;
      this.modalConfirmacaoAtivo = true;
    },
    encontarUsuario() {
      if (this.identificacao || this.nome) {
        this.loading = true;
        axios
          .post(
            process.env.VUE_APP_URL_BASE_API + 'api/cliente/procurar',
            {
              nome: this.nome,
              identificacao: this.identificacao,
              data_de_nascimento: this.data_de_nascimento,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then((r) => {
            this.id = r.data.cliente.id;
            this.novo_nome = r.data.cliente.nome;
            this.novo_identificacao = r.data.cliente.identificacao;
            this.novo_data_de_nascimento = r.data.cliente.data_de_nascimento;
            this.novo_classificacao = r.data.cliente.classificacao;
            this.novo_tipo_alimentacao = r.data.cliente.tipo_alimentacao;
            this.novo_observacoes = r.data.cliente.observacoes;
            this.modalAtivo = true;
          })
          .catch((e) => {
            this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível encontrar o usuário solicitado. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e}*`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.abrirModal('warning', 'Atenção!', 'Preencha o campo identificação ou nome e data de nascimento para continuar.');
      }
    },
    atualizarUsuario() {
      if (this.novo_nome && this.novo_identificacao && this.novo_classificacao && this.novo_classificacao != '-') {
        this.loading = true;
        axios
          .post(
            process.env.VUE_APP_URL_BASE_API + 'api/cliente/atualizar',
            {
              id: this.id,
              nome: this.novo_nome,
              identificacao: this.novo_identificacao,
              data_de_nascimento: this.novo_data_de_nascimento,
              classificacao: this.novo_classificacao,
              tipo_alimentacao: this.novo_tipo_alimentacao,
              observacoes: this.novo_observacoes == '' ? '-' : this.novo_observacoes,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then(() => {
            this.modalAtivo = false;
            this.abrirModal('success', 'Tudo certo por aqui!', `Dados atualizados no banco de dados com sucesso!`);
            this.limparForm();
          })
          .catch((e) => {
            this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível salvar o usuário no banco de dados, tente novamente. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e}*`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        alert('Preencha todos os campos corretamente para continuar.');
      }
    },
    deletarUsuario() {
      let confirmacao = confirm(`Esta ação irá excluir DEFINITIVAMENTE o usuário **${this.novo_nome}** do bando de dados. \n\n Deseja continuar?`);
      if (this.id && confirmacao) {
        this.loading = true;
        axios
          .get(process.env.VUE_APP_URL_BASE_API + 'api/cliente/deletar/' + this.id, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then(() => {
            this.limparForm();
            this.abrirModal('success', 'Tudo certo por aqui!', `O usuário foi excluído do banco de dados!`);
            this.modalAtivo = false;
            this.modalConfirmacaoAtivo = true;
          })
          .catch((e) => {
            this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível excluir o usário solicitado. \n *${e}*`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        console.log('Operação de exclusão cancelada ou algum data crucial para a deleção do usário não foi fornecido. Verifique o código.');
      }
    },
    limparForm() {
      this.identificacao = '';
      this.nome = '';
      this.data_de_nascimento = '2000-01-01';
      this.id = 0;
      this.novo_nome = '';
      this.novo_identificacao = '';
      this.novo_data_de_nascimento = '2000-01-01';
      this.novo_classificacao = '-';
      this.novo_tipo_alimentacao = '-';
      this.novo_observacoes = '-';
    },
  },
};
</script>

<style></style>
