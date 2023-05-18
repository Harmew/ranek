<template>
  <div>
    <h1>Página não encontrada.</h1>
    <router-link class="home" to="/">Voltar para a página inicial</router-link>
  </div>
</template>

<script>
export default {
  name: "PaginaNaoEncontradaView",
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 20px auto;
}

.home {
  display: block;
  text-align: center;
}
</style>
