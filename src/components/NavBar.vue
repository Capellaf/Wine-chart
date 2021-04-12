<template>
  <div class="navbar_container">
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