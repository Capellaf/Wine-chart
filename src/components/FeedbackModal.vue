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

.modal {
    display: flex;
    align-content: center;
    justify-content: center;
}

.modal_backdrop {
  background-color: rgba(0,0,0,.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
}

.modal_panel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  background-color: var(--light);
  position: fixed;
  z-index: 999;
  margin-top: 100px;
  width: 352px;
  height: 200px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
  border: 1 solid var(--dark);
  border-radius: 15px;
  animation-name: fade;
  animation-duration: .5s;
  font-family: Lato;
  font-weight: bold;
}

@keyframes fade {
  from {
      opacity: 0%;
  }
  to {
      opacity: 100%;
  }
}

.message {
    font-size: 20px;
    color: var(--title);
}

.ok_btn {
    cursor: pointer;
    background-color: var(--success);
    padding: 20px;
    width: 50%;
    border: none;
    border-radius: 5px;
    color: var(--white);
    font-size: 20px;
}
.ok_btn:hover {
    outline: none;
}
</style>