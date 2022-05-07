<template>
  <PageArea>
    <template v-slot:titulo> Solicitar refeição </template>
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
          <img src="svg/x.svg" alt="barcode" class="button-fechar" @click="limparForm()" />
          <h1 class="titulo">Solicitar refeição</h1>
          <form>
            <div class="form-item">
              <label for="nome">Nome completo:</label>
              <input type="text" id="nome" v-model="nome" disabled />
            </div>

            <div class="form-item identificacao">
              <label for="identificacao">Identificação:</label>
              <input type="text" id="identificacao" v-model="identificacao" disabled />
              <img src="svg/barcode.svg" alt="barcode" />
            </div>

            <div class="form-item">
              <label for="data_de_nascimento">Data de nascimento:</label>
              <input type="date" id="data_de_nascimento" v-model="data_de_nascimento" disabled />
            </div>

            <div class="form-item">
              <label for="tipo_de_refeicao">Classificação:</label>
              <select name="tipo_de_refeicao" id="tipo_de_refeicao" v-model="classificacao" disabled>
                <ClassificacaoUsuario></ClassificacaoUsuario>
              </select>
            </div>

            <div class="form-item">
              <label for="tipo_alimentacao">Tipo de alimentação:</label>
              <select name="tipo_alimentacao" id="tipo_alimentacao" v-model="tipo_alimentacao" disabled>
                <option value="normal">Normal</option>
                <option value="especial">Especial</option>
              </select>
            </div>

            <div class="form-item" v-show="tipo_alimentacao == 'especial'">
              <label for="observacoes">Observações:</label>
              <input type="text" id="observacoes" v-model="observacoes" disabled />
            </div>

            <div class="form-item">
              <fieldset>
                <legend>Horário solicitados</legend>
                <div class="form-sub_item">
                  <input type="checkbox" v-model="horariosSolicitados.cafe" id="cafe" />
                  <label for="cafe">Café da manhã</label>
                </div>

                <div class="form-sub_item">
                  <input type="checkbox" v-model="horariosSolicitados.almoco" id="almoco" />
                  <label for="almoco">Almoço</label>
                </div>

                <div class="form-sub_item">
                  <input type="checkbox" v-model="horariosSolicitados.janta" id="janta" />
                  <label for="janta">Janta</label>
                </div>
              </fieldset>
            </div>

            <div class="form-item">
              <label for="data_solicitada">Data solicitada:</label>
              <input type="date" id="data_solicitada" v-model="data_solicitada" />
            </div>
            <button v-on:click.prevent="solicitarRefeicao()" class="button-large">
              <div class="button_text">
                <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
                <span :class="!loading || 'hidden'">Solictar refeição</span>
              </div>
            </button>
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
import ModalConfirmacao from '../layouts/Modals/ModalConfirmacao.vue';
import ClassificacaoUsuario from '../layouts/options/ClassificacaoUsuario.vue';
import PageArea from '../layouts/PageArea.vue';

export default {
  name: 'App',
  components: {
    ModalConfirmacao,
    PageArea,
    ClassificacaoUsuario,
  },
  data() {
    return {
      identificacao: '',
      id: 0,
      nome: '',
      data_de_nascimento: '2000-01-01',
      classificacao: '-',
      tipo_alimentacao: '-',
      observacoes: '-',
      modalAtivo: false,
      modalConfirmacaoAtivo: false,
      loading: false,
      modal_titulo: '',
      modal_conteudo: '',
      backgourndModal: 'background_success',
      horariosSolicitados: {
        cafe: false,
        almoco: false,
        janta: false,
      },
      data_solicitada: new Date().toLocaleDateString('en-CA'),
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
            this.nome = r.data.cliente.nome;
            this.identificacao = r.data.cliente.identificacao;
            this.data_de_nascimento = r.data.cliente.data_de_nascimento;
            this.classificacao = r.data.cliente.classificacao;
            this.tipo_alimentacao = r.data.cliente.tipo_alimentacao;
            this.observacoes = r.data.cliente.observacoes;
            this.modalAtivo = true;
          })
          .catch((e) => {
            this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível encontar o usário solicitado. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e.response.data.erro}*`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.abrirModal('warning', 'Atenção!', 'Preencha o campo identificação ou nome e data de nascimento para continuar.');
      }
    },
    limparForm() {
      this.id = 0;
      this.nome = '';
      this.data_de_nascimento = '2000-01-01';
      this.classificacao = '-';
      this.tipo_alimentacao = 'normal';
      this.observacoes = '';
      this.loading = false;
      this.modalAtivo = false;
    },
    solicitarRefeicao() {
      let hoje = new Date();
      let dataSolicitda = new Date(`${this.data_solicitada} 23:59:59`);

      let diferencaMs = dataSolicitda.getTime() - hoje.getTime();
      let msBase = 129600000; // 36 horas de limite para solicitar

      if (this.horariosSolicitados.cafe || this.horariosSolicitados.almoco || this.horariosSolicitados.janta) {
        if (diferencaMs > msBase) {
          this.loading = true;
          axios
            .post(
              process.env.VUE_APP_URL_BASE_API + 'api/refeicao/solicitar',
              {
                cliente_id: this.id,
                data: this.data_solicitada,
                cafe: this.horariosSolicitados.cafe,
                almoco: this.horariosSolicitados.almoco,
                janta: this.horariosSolicitados.janta,
                classificacao: this.classificacao,
                tipo_alimentacao: this.tipo_alimentacao,
              },
              {
                headers: { 'Content-Type': 'application/json' },
              }
            )
            .then(() => {
              this.abrirModal('success', 'Tudo certo por aqui!', `A refeição foi solicitada com sucesso!`);
              this.limparForm();
            })
            .catch((e) => {
              //   console.log(e);
              if (e.response.data) {
                this.abrirModal('error', 'Desculpe, algo deu errado...', `${e.response.data.erro}`);
              } else {
                this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível atender à solicitação, tente novamente. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e}*`);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.abrirModal('warning', 'Atenção!', 'As solicitações de refeições só podem ser feitas até às 12:00h do dia anterior à data desejada para recebimento. Por favor, selecione uma data válida.');
        }
      } else {
        this.abrirModal('warning', 'Atenção!', 'Escolha pelo menos um horário de refeição para continuar.');
      }
    },
  },
};
</script>

<style></style>
