import Vue from "vue";
import VueRouter from "vue-router";

// Components
import HomeView from "@/views/HomeView.vue";
import ProdutoView from "@/views/ProdutoView.vue";
import LoginView from "@/views/LoginView.vue";
import UsuarioView from "@/views/usuario/UsuarioView.vue";
import UsuarioProdutosView from "@/views/usuario/UsuarioProdutosView.vue";
import UsuarioVendasView from "@/views/usuario/UsuarioVendasView.vue";
import UsuarioComprasView from "@/views/usuario/UsuarioComprasView.vue";
import UsuarioEditarView from "@/views/usuario/UsuarioEditarView.vue";
import PaginaNaoEncontradaView from "@/views/PaginaNaoEncontradaView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: PaginaNaoEncontradaView,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/produto/:id",
    name: "produto",
    component: ProdutoView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/usuario",
    component: UsuarioView,
    meta: {
      login: true,
    },
    children: [
      {
        path: "",
        name: "usuario",
        component: UsuarioProdutosView,
      },
      {
        path: "compras",
        name: "compras",
        component: UsuarioComprasView,
      },
      {
        path: "vendas",
        name: "vendas",
        component: UsuarioVendasView,
      },
      {
        path: "editar",
        name: "usuario-editar",
        component: UsuarioEditarView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (!window.localStorage.token) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
