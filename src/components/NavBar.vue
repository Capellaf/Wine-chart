<template>
  <div class="container">
    <wine-box 
      :state="getOpenWineBox"
      @closeWineBox="toggleWineBox"
    ></wine-box>
    <div class="navbar_menu">
      <section class="section_navbar_menu">
        <img alt="Wine" class="nav_menu" src="https://img.wine.com.br/logo/wine/black/wine.svg">
        <ul v-if="!isMobile" class="menu_list">
          <li><a href="#">Clube</a></li>
          <li><a href="#">Loja</a></li>
          <li><a href="#">Produtores</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Eventos</a></li>
        </ul>
      </section>
      <section class="section_navbar_menu">
        <div class="wine_chart" @click="toggleWineBox">
          <img src="../assets/wineBox_wrap.svg">
          <span class="chart_number">{{getItemsQuantity}}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import WineBox from './WineBox'

export default {
  name: 'NavBar',

  components: {
    WineBox
  },

  props: {
    msg: String
  },

  data() {
    return {
      openWineBox: false
    }
  },

  computed: {
    isMobile() {
      return this.$store.getters.isMobile;
    },
    getItemsQuantity() {
      return this.$store.state.chart.length > 0 ? this.$store.state.chart.reduce((total, item) => total + item.quantity, 0) : 0;
    },
    getOpenWineBox() {
      return this.openWineBox;
    }
  },

  methods: {
    toggleWineBox() {
      this.$set(this, 'openWineBox', !this.openWineBox);
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 10px;
  max-width: 100%;
  background-color: var(--white);
  border-bottom: 1 solid var(--dark);
}

.navbar_menu {
  display: flex;
  align-items: center;
  width: 1180px;
  justify-content: space-between;
}

.section_navbar_menu {
  display: flex;
  align-items: center;
}

.menu_list > li {
  display: inline-block;
  padding: 10px;
}

.menu_list a:link  {
  text-decoration: none;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: var(--dark);
}
.menu_list a:hover  {
  color: var(--green);
}

.wine_chart {
  right: 0;
  cursor: pointer;
}

.chart_number {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: var(--light);
  color: var(--green);
  border-radius: 50%;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  width: 20px;
  height: 20px;
  letter-spacing: normal;
  line-height: 15px;
  bottom: 15px;
  margin-left: 40px;
}
</style>
