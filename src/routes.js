import { createRouter, createWebHashHistory } from 'vue-router'

// VIEWS
import IndexHome from '@/components/views/IndexHome.vue'
import CadastrarUsuario from '@/components/views/CadastrarUsuario.vue'
import GerenciarUsuario from '@/components/views/GerenciarUsuario.vue'
import RegistrarPresenca from '@/components/views/RegistrarPresenca.vue'
import SolicitarRefeicao from '@/components/views/SolicitarRefeicao.vue'
import VisualizarRelatorios from '@/components/views/VisualizarRelatorios.vue'
import HomeComponent from '@/components/views/HomeComponent.vue'
import WelcomeComponent from '@/components/views/WelcomeComponent.vue'
import LogIn from '@/components/views/LogIn.vue'

const routes = [
    {
        path: '/app',
        component: HomeComponent,
        redirect: '/app/home',
        children: [
            { path: 'home', component: IndexHome },
            { path: 'cadastrarusuario', component: CadastrarUsuario },
            { path: 'solicitarrefeicao', component: SolicitarRefeicao },
            { path: 'gerenciarusuario', component: GerenciarUsuario },
            { path: 'registrarpresenca', component: RegistrarPresenca },
            { path: 'visualizarrelatorios', component: VisualizarRelatorios },
        ]
    },
    { path: '/login', component: LogIn },
    { path: '/', component: WelcomeComponent },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
