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
            <button v-if="getWineAvailable" class="add_product">Adicionar Produto</button>
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
        }
    }
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: var(--white);
    width: 380px;
    height: 210px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
}

.card_mobile {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    background-color: var(--white);
    width: 180px;
    height: 328px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
}

.wine_img {
    width: 50%;
    margin-top: 10px;
    justify-items: center;
}

.wine_img_mobile {
    height: 50%;
}

.wine_info {
    width: 50%;
    margin-top: 10px;
    justify-items: center;
    font-family: Lato;
    font-style: normal;
    text-align: left;
}

.wine_info_mobile {
    height: 45%;
    margin-top: 5px;
    font-family: Lato;
    font-style: normal;
    text-align: center;
}

.wine_title_div {
    height: 20%;
}

.wine_title {
    font-weight: bold;
    font-size: 14px;
}

.wine_value {
    margin-top: 30px;
    margin-bottom: 10px;
}

.wine_promo_price {
    font-size: 14px;
    line-height: 25px;
    text-decoration-line: line-through;
    color: var(--darkgray);
}

.wine_no_member_price {
    font-size: 12px;
    line-height: 25px;
    color: var(--darkgray);
    margin-bottom: 10px;
}

.socio_paragraph {
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    color: var(--title); 
}

.total_values {
  font-size: 12px;
  font-weight: bold;
  color: var(--pink);
}

.total_integer {
  font-size: 16px;
  margin-left: 2px;
  margin-right: -2px;
}

.add_product {
    margin-top: 10px;
    background-color: var(--pink);
    border: none;
    border-radius: 4px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
    width: 156px;
    height: 40px;
    text-align: center;
    color: var(--white);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}
.add_product:hover{
    background-color: var(--green);
}
.add_product:focus{
    outline: 0;
}

.no_available_btn {
    margin-top: 10px;
    background-color: var(--disabled);
    border: none;
    border-radius: 4px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
    width: 156px;
    height: 40px;
    text-align: center;
    color: var(--white);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}
.no_available_btn:focus{
    outline: 0;
}
</style>