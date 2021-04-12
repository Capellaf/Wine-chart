<template>
    <div class="container">
        <feedback-modal :state="getFeedbackModalState" @closeModal="toggleFeedback"></feedback-modal>
        <span class="banner">
            <img v-if="!isMobile" alt="Banner" src="../assets/banner.svg">
            <img v-else alt="BannerMobile" src="../assets/banner_mobile.svg">
        </span>
        <div :class="[{'wine_div': true}, {'mobile_wine_div': isMobile}]">
            <section class="wine_section" v-for="(item, idx) in getWineList" :key="idx">
                <wine-card :wine="item" @addProduct="toggleFeedback"></wine-card>
            </section>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
import WineCard from '../components/WineCard.vue'
import FeedbackModal from '../components/FeedbackModal'

export default {
    data() {
        return {
            wineList: [],
            feedbackModal: false
        }
    },

    mounted() {
        this.getProducts();
    },

    components: {
        WineCard,
        FeedbackModal
    },

    computed: {
        isMobile() {
            return this.$store.getters.isMobile;
        },
        getWineList() {
            return this.wineList;
        },
        getFeedbackModalState() {
            return this.feedbackModal;
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
        },
        toggleFeedback() {
            this.$set(this, 'feedbackModal', !this.feedbackModal)
        }
    }
}
</script>