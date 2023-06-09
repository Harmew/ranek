<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div v-for="(produto, index) in produtos" :key="index" class="produto">
          <router-link :to="{ name: 'produto', params: { id: produto.id } }">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <p class="preco">{{ produto.preco | numeroPreco }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar
          :produtosTotal="produtosTotal"
          :produtosPorPagina="produtosPorPagina"
        />
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultado">
        <p class="sem-resultados">
          Busca sem resultados. Tente buscar outro termo.
        </p>
      </div>
      <div v-else key="carregando">
        <PaginaCarregando />
      </div>
    </transition>
  </section>
</template>

<script>
import ProdutosPaginar from "./ProdutosPaginar.vue";
import { api } from "@/services/api.js";
import serialize from "@/helpers/serialize.js";
import PaginaCarregando from "./PaginaCarregando.vue";

export default {
  name: "ProdutosLista",
  data() {
    return {
      produtos: null,
      produtosPorPagina: 9,
      produtosTotal: 0,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.produtosPorPagina}${query}`;
    },
  },
  methods: {
    getProdutos() {
      this.produtos = null;
      api.get(this.url).then((r) => {
        this.produtosTotal = Number(r.headers["x-total-count"]);
        this.produtos = r.data;
      });
    },
  },
  created() {
    this.getProdutos();
  },
  watch: {
    $route() {
      this.getProdutos();
    },
  },
  components: {
    ProdutosPaginar,
    PaginaCarregando,
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

@media screen and (max-width: 500px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 10px;
  }
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}
</style>
