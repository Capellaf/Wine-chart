<template>
  <div id="app">
    <nav-bar class="nav_bar"></nav-bar>
    <div class="main_container">
      <div class="page">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',

  components: {
    NavBar
  },

  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    handleResize() {
      this.$store.commit('SET_WINDOW_WIDTH', window.innerWidth); //Evento para verificar tamanho da tela, resultado utilizado para verificar se é um dispositivo mobile
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');
:root {
  --light: #f5f5f5;
  --dark: #666666;
  --white: #ffffff;
  --green: #5CB79F;
  --pink: #B6116E;
  --disabled: #A0A0A0;
  --success: #7FBC44;
  --darkgray: #888888;
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
}

body {
  background-color: var(--light);
  margin: 0;
}

.main_container {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 50px;
}

.page {
  max-width: 1180px;
}

</style>
