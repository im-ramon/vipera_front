<template>
  <PageArea>
    <template v-slot:titulo> Gerenciar usuário </template>
    <template v-slot:body>
      <transition name="fade">
        <ModalConfirmacao v-if="modalConfirmacaoAtivo">
          <img src="svg/x.svg" @click="modalConfirmacaoAtivo = false" class="button-fechar" alt="Fechar" />
          <h3>Tudo certo por aqui!</h3>
          <p>Os dados do usuário foram atualziados com sucesso!</p>
        </ModalConfirmacao>
      </transition>

      <div id="modal_consulta" v-if="modalAtivo">
        <div id="modal-area">
          <img src="svg/x.svg" alt="barcode" class="button-fechar" @click="modalAtivo = false" />
          <h1 class="titulo">Gerenciar usuário</h1>
          <form>
            <div class="form-item">
              <label for="nome_usuario">Nome completo:</label>
              <input type="text" id="nome_usuario" v-model="novo_nome" />
            </div>

            <div class="form-item identificacao">
              <label for="identificacao">Identificação:</label>
              <input type="text" id="identificacao" v-model="novo_identificacao" />
              <img src="svg/barcode.svg" alt="barcode" />
            </div>

            <div class="form-item">
              <label for="data_de_nascimento">Data de nascimento:</label>
              <input type="date" id="data_de_nascimento" v-model="novo_data_de_nascimento" />
              <!-- <span id="idade"
                >Idade: <strong>{{ idadeHoje || '___' }} ano(s)</strong></span
              > -->
            </div>

            <div class="form-item">
              <label for="tipo_de_refeicao">Classificação:</label>
              <select name="tipo_de_refeicao" id="tipo_de_refeicao" v-model="novo_classificacao">
                <option value="-" disabled>Selecione um tipo</option>
                <option value="abrigo">Civis do abrigo</option>
                <option value="apoio">Pessoal de Apoio</option>
                <option value="crianca1">Criança até 1 ano</option>
                <option value="crianca12">Criança de 1 a 12 anos</option>
              </select>
            </div>

            <div class="form-item">
              <label for="tipo_de_refeicao">Tipo de alimentação:</label>
              <select name="tipo_de_refeicao" id="tipo_de_refeicao" v-model="novo_tipo_alimentacao">
                <option value="-" disabled>Selecione um tipo</option>
                <option value="comum">Comum</option>
                <option value="indigena">Indígena</option>
                <option value="especial">Especial</option>
              </select>
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
          <input type="text" id="identificacao" autofocus v-model="identificacao" :disabled="nome.length > 0" />
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

        <button v-on:click.prevent="encontarUsuario()" class="button-large">
          <div class="button_text">
            <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
            <span :class="!loading || 'hidden'">Consultar</span>
          </div>
        </button>
      </form>
    </template>
  </PageArea>
</template>

<script>
import axios from 'axios';
import PageArea from '../layouts/PageArea.vue';
import ModalConfirmacao from '../layouts/Modals/ModalConfirmacao.vue';

export default {
  components: {
    PageArea,
    ModalConfirmacao,
  },
  data() {
    return {
      modalAtivo: false,
      modalConfirmacaoAtivo: false,
      identificacao: '',
      nome: '',
      data_de_nascimento: '2000-01-01',
      loading: false,
      id: 0,
      novo_nome: '',
      novo_identificacao: '',
      novo_data_de_nascimento: '2000-01-01',
      novo_classificacao: '-',
      novo_tipo_alimentacao: '-',
    };
  },
  methods: {
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
            this.modalAtivo = true;
          })
          .catch((e) => {
            alert(`O servidor retornou o seguinte erro:\n\t ${e.response.data.erro}\n\nPor favor, verifique os dados digitados e tente novamente.`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        alert('Preencha o identificação ou o nome e data de nascimento para continuar.');
      }
    },
    atualizarUsuario() {
      if (this.novo_nome && this.novo_identificacao && this.novo_classificacao && this.novo_tipo_alimentacao) {
        this.loading = true;
        axios
          .post(
            process.env.VUE_APP_URL_BASE_API + 'api/cliente/atualizar',
            {
              id: this.id,
              nome: this.novo_nome,
              identificacao: this.novo_identificacao,
              classificacao: this.novo_classificacao,
              tipo_alimentacao: this.novo_tipo_alimentacao,
              data_de_nascimento: this.novo_data_de_nascimento,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then((r) => {
            console.log(r.data);
            this.limparForm();
            this.modalAtivo = false;
            this.modalConfirmacaoAtivo = true;
          })
          .catch((e) => {
            alert(`O servidor retornou o seguinte erro:\n\t ${e.response.data.erro}\n\nPor favor, verifique os dados digitados e tente novamente.`);
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
          .then((r) => {
            console.log(r.data);
            this.limparForm();
            this.modalAtivo = false;
            this.modalConfirmacaoAtivo = true;
          })
          .catch((e) => {
            alert(`O servidor retornou o seguinte erro:\n\t ${e.response.data.erro}\n\nPor favor, verifique os dados digitados e tente novamente.`);
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
    },
  },
};
</script>

<style></style>
