import { createApp } from 'vue'
import App from './App.vue'

// ROTAS
import { createRouter, createWebHashHistory } from 'vue-router'
import CadastrarUsuario from '@/components/views/CadastrarUsuario.vue'
import GerenciarUsuario from '@/components/views/GerenciarUsuario.vue'
import SolicitarRefeicao from '@/components/views/SolicitarRefeicao.vue'
import RegistrarPresenca from '@/components/views/RegistrarPresenca.vue'
import VisualizarEstatisticas from '@/components/views/VisualizarEstatisticas.vue'
import IndexHome from '@/components/views/IndexHome.vue'


const routes = [
    { path: '/', component: IndexHome },
    { path: '/cadastrarusuario', component: CadastrarUsuario },
    { path: '/solicitarrefeicao', component: SolicitarRefeicao },
    { path: '/registrarpresenca', component: RegistrarPresenca },
    { path: '/visualizarestatisticas', component: VisualizarEstatisticas },
    { path: '/gerenciarusuario', component: GerenciarUsuario },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

const Vue = createApp(App)
Vue.use(router)
Vue.mount('#app')
