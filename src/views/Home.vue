<template>
    <div class="container">
        <span class="banner">
            <img v-if="!isMobile" alt="Banner" src="../assets/banner.svg">
            <img v-else alt="BannerMobile" src="../assets/banner_mobile.svg">
        </span>
        <div :class="[{'wine_div': true}, {'mobile_wine_div': isMobile}]">
            <section class="wine_section" v-for="(item, idx) in getWineList" :key="idx">
                <wine-card :wine="item"></wine-card>
            </section>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
import WineCard from '../components/WineCard.vue'

export default {
    data() {
        return {
            wineList: []
        }
    },

    mounted() {
        this.getProducts();
    },

    components: {
        WineCard
    },

    computed: {
        isMobile() {
            return this.$store.getters.isMobile;
        },
        getWineList() {
            return this.wineList;
        }
    },

    methods: {
        async getProducts() {
            try {
                const res = await axios.get('https://run.mocky.io/v3/908ec5b5-1e5a-4602-9008-47719f7c6759');
                if(res.data) this.$set(this, 'wineList', res.data)
            } catch (error) {
                console.log('getWineList: ', error);
            }
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-items: center;
}

.container_mobile {
    max-height: 100%;
}

.banner {
    margin-bottom: 50px;
}

.wine_div {
    display: flex;
    width: 1180px;
    overflow-x: auto;
    margin-bottom: 20px;
}

.mobile_wine_div {
    max-width: 326px;
}

.wine_section {
    padding: 6px;
}
</style>