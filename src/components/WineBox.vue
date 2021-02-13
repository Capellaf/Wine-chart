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

.slide-enter-active,
.slide-leave-active
{
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}

.sidebar_backdrop {
  background-color: rgba(0,0,0,.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.sidebar_panel {
  overflow: hidden;
  background-color: var(--light);
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 0;
  width: 352px;
}

.header {
  display: flex;
  top: 0;
  width: 100%;
  height: 56,34px;
  align-items: center;
  text-align: left;
  font-size: 20px;
  background-color: var(--white);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.title {
  display: flex;
  line-height: 16px;
  padding: 20px;
}

.back_btn {
  width: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.footer {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 141px;
  align-items: center;
  font-size: 20px;
  background-color: var(--white);
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
}

.total_span {
  display: flex;
  padding: 25px; 
  width: 318px;
  justify-content: space-between;
  font-size: 10px;
  font-weight: bold;
  color: var(--dark)
}

.total_values {
  font-size: 12px;
  color: var(--pink);
}

.total_integer {
  margin-left: 2px;
  margin-right: -2px;
  font-size: 16px;
}

.buy_product {
  margin-top: 10px;
  background-color: var(--success);
  border: none;
  border-radius: 4px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
  width: 318px;
  height: 40px;
  text-align: center;
  color: var(--white);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
.buy_product:hover{
    background-color: var(--green);
}
.buy_product:focus{
    outline: 0;
}

.wine_list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 220px);
  margin-top: 20px;
  margin-bottom: 20px;
  align-content: center;
  overflow-y: auto;
}

.no_items {
  font-size: 20px;
  font-weight: bold;
  color: var(--dark);
}

hr {
  width: 318px;
  border: 0.5px solid var(--division);
}
</style>