<template>
    <div class="container">
        <span class="banner">
            <img v-if="!isMobile" alt="Banner" src="../assets/banner.svg">
            <img v-else alt="BannerMobile" src="../assets/banner_mobile.svg">
        </span>
        <div class="wine_div">
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

.banner {
    margin-bottom: 50px;
}

.wine_div {
    display: flex;
}

.wine_section {
    padding: 6px;
}
</style>