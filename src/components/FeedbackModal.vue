<template>
    <div class="modal" v-if="getState">
        <div class="modal_backdrop" @click="$emit('closeModal')"></div>
        <div class="modal_panel">
            <span class="message">{{getMessage}}</span>
            <button class="ok_btn" @click="$emit('closeModal')">OK</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedbackModal',

    props: {
        state: { type: Boolean, default: false },
        message: { type: String, default: 'Um item foi adicionado ao carrinho'}
    },

    computed: {
        getState() {
            return this.state;
        },
        getMessage() {
            return this.message;
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
</style>