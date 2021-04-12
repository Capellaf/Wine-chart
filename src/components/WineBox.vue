<template>
  <div class="sidebar">
    <div class="sidebar_backdrop"
        v-if="getState"
        @click="$emit('closeWineBox')" 
    >
    </div>
    <transition name="slide">
      <div v-if="getState" id="sidebar_panel" class="sidebar_panel">
        <slot>
          <div class="header">
            <span class="title">
              <img class="back_btn" @click="$emit('closeWineBox')" src="../assets/left-arrow.svg">
              {{`WineBox (${getItemsQuantity})`}}
            </span>
          </div>
          <div id="wine_list" class="wine_list">
              <span v-if="getItemsQuantity < 1" class="no_items"> Não há itens no carrinho</span>   
              <div v-else class="wine_slot" v-for="(item, idx) in getWineList" :key="idx">
                <wine-slot :wine="item"></wine-slot>
                <hr>
              </div>      
          </div>
          <div v-if="getItemsQuantity > 0" class="footer">
            <span class=total_span>
              SUBTOTAL
              <span class="total_values">
                R$
                <span class="total_integer"> {{ Math.trunc( getTotalValue) }},</span>
                {{ getTotalDecimal }}
              </span>
            </span>
            <button class="buy_product">Finalizar pedido</button>
          </div>
        </slot>
      </div>
    </transition>
  </div>  
</template>

<script>
import { getDecimalValue } from '../utils/formatters'
import WineSlot from './WineSlot'

export default {
    name: 'WineBox',

    props: {
        state: { type: Boolean, default: false } 
    },

    components: {
      WineSlot
    },

    computed: {
        isMobile() {
          return this.$store.getters.isMobile;
        },
        getState() {
            return this.state;
        },
        getItemsQuantity() {
          return this.$store.state.chart.reduce((total, item) => total + item.quantity, 0);
        },
        getTotalValue() {    
          return this.$store.state.chart.length > 0 ? this.$store.state.chart.reduce((total, item) => total + (item.quantity * (item.pricePromotional > 0 ? item.pricePromotional : item.priceStock)), 0) : 0;
        },
        getTotalDecimal() {
          const total = this.getTotalValue;
          return getDecimalValue(total);
        },
        getWineList() {
          return this.$store.state.chart;
        }
    },
    
    methods: {
        closeSidebar() {
          this.$emit('closeWineBox');
        }
    }
}
</script>

<style scoped>
body{
  height: 100%; 
  height: 100%;
  margin: 0; 
  padding: 0;
}

hr {
  width: 318px;
  border: 0.5px solid var(--division);
}
</style>