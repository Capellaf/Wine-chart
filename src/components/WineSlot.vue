<template>
    <div class="container">
        <img :src="getWineInfo.image"> 
        <div class="info">
            <div class="row">
                <span class="wine_title">{{getWineInfo.name}}</span>
                <span class="delete_btn">X</span>
            </div>
            <div class="row">
                <span class="quantity_control">
                    <button class="quantity_control_btn" :disabled="getWineInfo.quantity < 2">-</button>
                    <span>{{getWineInfo.quantity}}</span>
                    <button class="quantity_control_btn">+</button>
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
            return this.wine.quantity * this.wine.price;
        },
        getWinePriceDecimal() {
          const price = this.getWinePrice;
          return getDecimalValue(price);
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    width: 318px;
    height: 150px;
    margin-bottom: 20px;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content:  space-between;
}

.row {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px;
    justify-content: space-between;
}

.wine_title {
    max-width: 169px;
    font-size: 14px;
    font-weight: bold;
    color: var(--title);
    text-align: left;
}

.delete_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--close);
    border: 1px solid var(--close);
    border-radius: 50%;
    width: 19px;
    height: 19px;
    font-size: 10px;
    cursor: pointer;
}

.quantity_control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 76.94px;
    height: 38px;
    border: .5px solid var(--darkgray);
    border-radius: 3px;
    color: var(--darkgray);
}

.quantity_control_btn {
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: bold;
    color: var(--darkgray);
    font-size: 16px;
}
.quantity_control_btn:focus {
    outline: 0;
}
.quantity_control_btn:disabled {
    font-weight: normal;
}

.values_slot{
    display: flex;
    margin-top: 16px;
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
</style>