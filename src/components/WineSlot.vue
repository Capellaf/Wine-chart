<template>
    <div class="container_slot">
        <img :src="getWineInfo.image"> 
        <div class="info">
            <div class="row">
                <span class="wine_title">{{getWineInfo.name}}</span>
                <span class="delete_btn" @click="deleteProduct">X</span>
            </div>
            <div class="row">
                <span class="quantity_control">
                    <button class="quantity_control_btn" :disabled="getWineInfo.quantity < 2" @click="removeProduct">-</button>
                    <span>{{getWineInfo.quantity}}</span>
                    <button class="quantity_control_btn" @click="addProduct">+</button>
                </span>
                <span class="values_slot">
                    <span class="total_values">
                        R$
                        <span class="total_integer"> {{ Math.trunc(getWinePrice) }},</span>
                        {{ getWinePriceDecimal }}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { getDecimalValue } from '../utils/formatters'

export default {
    name: 'WineSlot',
    
    props: {
        wine: { type: Object, default: () => {} }
    },

    computed: {
        getWineInfo() {
            return this.wine;
        },
        getWinePrice() {
            return this.wine.quantity * this.wine.pricePromotional > 0 ? this.wine.pricePromotional : this.wine.priceStock;
        },
        getWinePriceDecimal() {
          const price = this.getWinePrice;
          return getDecimalValue(price);
        }
    },

    methods: {
        addProduct() {
            const repetitiveItemIndex = this.$store.state.chart.findIndex(item => item.name === this.wine.name);
            this.$store.state.chart[repetitiveItemIndex].quantity += 1;
        },
        removeProduct() {
            const repetitiveItemIndex = this.$store.state.chart.findIndex(item => item.name === this.wine.name);
            this.$store.state.chart[repetitiveItemIndex].quantity -= 1;
        },
        deleteProduct() {   
            const repetitiveItemIndex = this.$store.state.chart.findIndex(item => item.name === this.wine.name);
            this.$store.state.chart.splice( repetitiveItemIndex, 1);
        }
    } 
}
</script>
