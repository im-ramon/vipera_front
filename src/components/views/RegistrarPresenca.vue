<template>
  <PageArea>
    <template v-slot:titulo> Registrar presença </template>
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
          <img src="svg/x.svg" alt="x" class="button-fechar" @click="modalAtivo = false" />
          <h1 class="titulo">Registrar presença</h1>
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
              <fieldset class="presencao">
                <legend>Refeições</legend>
                <!-- <div :class="horariosSolicitados.cafe && 'refeicao_solicitada'" class="form-sub_item">
                  <input type="checkbox" v-model="horariosSolicitados.cafe" id="cafe" disabled />
                  <label for="cafe">Café da manhã</label>
                </div> -->

                <div :class="backgroundRefeicoes(horariosSolicitados.cafe)" class="form-sub_item">
                  <h4>Café da manhã</h4>
                  <p>{{ statusRefeicao('cafe') }}</p>
                </div>
                <div :class="backgroundRefeicoes(horariosSolicitados.almoco)" class="form-sub_item">
                  <h4>Almoço</h4>
                  <p>{{ statusRefeicao('almoco') }}</p>
                </div>
                <div :class="backgroundRefeicoes(horariosSolicitados.janta)" class="form-sub_item">
                  <h4>Jantar</h4>
                  <p>{{ statusRefeicao('janta') }}</p>
                </div>
              </fieldset>
            </div>

            <div class="form-item">
              <label for="data_solicitada">Data solicitada:</label>
              <input type="date" id="data_solicitada" v-model="data_solicitada" disabled />
            </div>

            <div class="form-item">
              <label for="data_solicitada">Refeição a ser confirmada:</label>
              <span class="refeicao_atual" @click="alterarRefeicao()" title="Trocar refeição"
                >{{ refeicaoFormatada }}
                <img src="svg/refresh.svg" alt="refresh" class="button-refresh" />
              </span>
            </div>

            <template v-if="horariosSolicitados[refeicaoAtual] != '2' && horariosSolicitados[refeicaoAtual] != '3'">
              <div>
                <p class="h3_alerta" v-if="horariosSolicitados[refeicaoAtual] === '0'">
                  Este usuário não solicitou a refeição "<strong>{{ refeicaoFormatada }}</strong
                  >".
                  <br />
                  Deseja registrar seu consumo como "extra"?
                </p>
                <button v-if="horariosSolicitados[refeicaoAtual] === '0'" v-on:click.prevent="registrarRefeicao('x')" class="button-large">
                  <div class="button_text">
                    <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
                    <span :class="!loading || 'hidden'">Registrar como extra</span>
                  </div>
                </button>
                <button v-else v-on:click.prevent="registrarRefeicao('')" class="button-large">
                  <div class="button_text">
                    <img :class="loading || 'hidden'" class="button_loading" src="/svg/animated_loading.svg" alt="loading" />
                    <span :class="!loading || 'hidden'">Registrar presença</span>
                  </div>
                </button>
              </div>
            </template>
            <p class="h3_alerta" v-else>
              O usário já consumiu a refeição <strong>{{ refeicaoFormatada }}</strong> hoje!"
            </p>
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
import ModalConfirmacao from '../layouts/Modals/ModalConfirmacao.vue';
import ClassificacaoUsuario from '../layouts/options/ClassificacaoUsuario.vue';
import PageArea from '../layouts/PageArea.vue';

export default {
  data() {
    return {
      modalAtivo: false,
      identificacao: '',
      nome: '',
      data_de_nascimento: '2000-01-01',
      data_da_refeicao: '2000-01-01',
      id: 0,
      classificacao: '-',
      tipo_alimentacao: '-',
      observacoes: '-',
      modalConfirmacaoAtivo: false,
      loading: false,
      modal_titulo: '',
      modal_conteudo: '',
      backgourndModal: 'background_success',
      horariosSolicitados: {
        cafe: 0,
        almoco: 0,
        janta: 0,
      },
      data_solicitada: '2000-01-01',
      refeicaoAtual: 'cafe',
    };
  },
  components: {
    PageArea,
    ModalConfirmacao,
    ClassificacaoUsuario,
  },
  computed: {
    refeicaoFormatada() {
      if (this.refeicaoAtual == 'cafe') {
        return 'Café da manhã';
      } else if (this.refeicaoAtual == 'almoco') {
        return 'Almoço';
      } else {
        return 'Jantar';
      }
    },
    dataHoje() {
      let hoje = new Date();
      return hoje.toLocaleDateString('en-CA');
    },
  },
  methods: {
    statusRefeicao(refeicao) {
      if (this.horariosSolicitados[refeicao] === '1') {
        return 'Solicitado e não consumido';
      } else if (this.horariosSolicitados[refeicao] === '2') {
        return 'Refeição já consumida';
      } else if (this.horariosSolicitados[refeicao] === '3') {
        return 'Refeição já consumida';
      } else {
        return 'Refeição não solicitada';
      }
    },
    backgroundRefeicoes(status) {
      if (status === '1') {
        return 'background-amarelo-suave';
      } else if (status === '2') {
        return 'background-verde-suave';
      } else if (status === '3') {
        return 'background-azul-suave';
      } else {
        return 'background-vermelho-suave';
      }
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
            this.procurarRefeicao();
          })
          .catch((e) => {
            this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível atender à solicitação, tente novamente. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e.response.data.erro}*`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.abrirModal('warning', 'Atenção!', 'Preencha o campo identificação ou nome e data de nascimento para continuar.');
      }
    },
    registrarRefeicao(tipo) {
      if (this.id && this.dataHoje) {
        this.loading = true;
        axios
          .get(process.env.VUE_APP_URL_BASE_API + `api/refeicao/consumo/registrar${tipo}/${this.id}/${this.refeicaoAtual}/${this.dataHoje}`, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then((r) => {
            if (r.data == 0) {
              this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível atender à solicitação, tente novamente. \n\n Caso o erro persista, entre em contato com  o administrador.`);
            } else {
              this.abrirModal('success', 'Tudo certo por aqui!', `O consumo do ${this.refeicaoFormatada} foi registrado!`);
              this.modalAtivo = false;
            }
          })
          .catch((e) => {
            this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível atender à solicitação, tente novamente. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e.response.data.erro}*`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.abrirModal('warning', 'Atenção!', 'Preencha o campo identificação ou nome e data de nascimento para continuar.');
      }
    },
    procurarRefeicao() {
      if (this.id /*&& this.data  -- Colocar data HOJE como computed*/) {
        this.loading = true;
        axios
          .get(process.env.VUE_APP_URL_BASE_API + `api/refeicao/consumo/procurar/${this.id}/${this.dataHoje}`, {
            headers: { 'Content-Type': 'application/json' },
          })
          .then((r) => {
            if (r.data) {
              this.data_solicitada = r.data.data;
              this.horariosSolicitados.cafe = r.data.cafe;
              this.horariosSolicitados.almoco = r.data.almoco;
              this.horariosSolicitados.janta = r.data.janta;
              this.modalAtivo = true;
            } else {
              this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível encontrar nenhuma solicitação de refeição para este usuário nesta data. Tente novamente.`);
            }
          })
          .catch((e) => {
            this.abrirModal('error', 'Desculpe, algo deu errado...', `Não foi possível atender à solicitação, tente novamente. \n\n Caso o erro persista, informe esta mensagem ao administrador: \n *${e}*`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.abrirModal('warning', 'Atenção!', 'Preencha o campo identificação ou nome e data de nascimento para continuar.');
      }
    },
    alterarRefeicao() {
      if (this.refeicaoAtual == 'cafe') {
        this.refeicaoAtual = 'almoco';
      } else if (this.refeicaoAtual == 'almoco') {
        this.refeicaoAtual = 'janta';
      } else if (this.refeicaoAtual == 'janta') {
        this.refeicaoAtual = 'cafe';
      }
    },
  },
};
</script>

<style></style>
