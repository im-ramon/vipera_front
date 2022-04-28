import { createRouter, createWebHashHistory } from 'vue-router'

// VIEWS
import IndexHome from '@/components/views/IndexHome.vue'
import CadastrarUsuario from '@/components/views/CadastrarUsuario.vue'
import GerenciarUsuario from '@/components/views/GerenciarUsuario.vue'
import RegistrarPresenca from '@/components/views/RegistrarPresenca.vue'
import SolicitarRefeicao from '@/components/views/SolicitarRefeicao.vue'
import VisualizarRelatorios from '@/components/views/VisualizarRelatorios.vue'

const routes = [
    { path: '/', component: IndexHome },
    { path: '/cadastrarusuario', component: CadastrarUsuario },
    { path: '/solicitarrefeicao', component: SolicitarRefeicao },
    { path: '/gerenciarusuario', component: GerenciarUsuario },
    { path: '/registrarpresenca', component: RegistrarPresenca },
    { path: '/visualizarrelatorios', component: VisualizarRelatorios },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
