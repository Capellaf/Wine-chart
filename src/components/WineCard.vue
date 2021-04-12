<template>
    <div v-if="!isMobile" class="card">
        <div class="wine_img">
            <img :src="getWineImg">
        </div>
        <div class="wine_info">
            <div class="wine_title_div">
                <span class="wine_title">{{getWineName}}</span>
            </div>
            <div v-if="getWineAvailable" class="wine_value">
                <span class="wine_promo_price">{{getWinePromoPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}}</span><br>
                <span class="socio_paragraph">Sócio Wine</span><br>
                <span>
                    <span class="total_values">
                        R$
                        <span class="total_integer"> {{ Math.trunc( getWineMemberPrice) }},</span>
                        {{ getWineMemberPriceDecimal }}
                    </span>
                </span>
            </div>
            <button v-if="getWineAvailable" class="add_product" @click="addProduct">Adicionar Produto</button>
            <button v-else class="no_available_btn" disabled>Esgotado</button>
        </div>
    </div>

    <!-- Mobile -->
    <div v-else class="card_mobile">
        <div class="wine_img_mobile">
            <img :src="getWineImg">
        </div>
        <div class="wine_info_mobile">
            <div class="wine_title_div">
                <span class="wine_title">{{getWineName}}</span>
            </div>
            <div v-if="getWineAvailable" class="wine_value">
                <span class="wine_promo_price">{{getWinePromoPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}}</span><br>
                <span class="socio_paragraph">Sócio Wine</span><br>
                <span>
                    <span class="total_values">
                        R$
                        <span class="total_integer"> {{ Math.trunc( getWineMemberPrice) }},</span>
                        {{ getWineMemberPriceDecimal }}
                    </span>
                </span>
                <br>
                <span class="wine_no_member_price">NÃO SÓCIO R$ {{getWinePromoPrice.toLocaleString('pt-br', {minimumFractionDigits: 2})}}</span>
            </div>
            <button v-if="getWineAvailable" class="add_product" @click="addProduct">Adicionar Produto</button>
            <button v-else class="no_available_btn">Esgotado</button>
        </div>
    </div>
</template>

<script>
import { getDecimalValue } from '../utils/formatters'

export default {
    name: 'WineCard',

    props: {
        wine: { type: Object, default: () => {} }
    },

    computed: {
        isMobile() {
            return this.$store.getters.isMobile;
        },
        getWineImg() {
            return this.wine.image;
        },
        getWineName() {
            return this.wine.name;
        },
        getWineAvailable() { 
            return this.wine.available;
        },
        getWinePromoPrice() {
            return this.wine.pricePromotional;
        },
        getWineMemberPrice() {
            return this.wine.priceMember;
        },
        getWineMemberPriceDecimal() {
          const total = this.getWineMemberPrice;
          return getDecimalValue(total);
        }
    },

    methods: {
        addProduct() {
            const itemsChart = this.$store.state.chart;
            const repetitiveItemIndex = itemsChart.findIndex(item => item.name === this.wine.name); //Verifica se vinho já está no carrinho
            if (repetitiveItemIndex < 0) this.$store.state.chart.push({...this.wine, quantity: 1}); //Adiciona novo vinho
            else this.$store.state.chart[repetitiveItemIndex].quantity += 1; //Aumenta quantidade de existente
            this.$store.state.itemsQuantity += 1;
            this.$emit('addProduct');
        }
    }
}
</script>