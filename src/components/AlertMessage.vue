<template>
  <div class="message-alert">
    <div class="alert alert-dismissible show fade"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
        {{ item.message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert"
        aria-label="Close" @click="removeMessage(i)">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 100%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
