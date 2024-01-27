<template>
  <div class="my-5 row justify-content-center">
    <!-- loading start -->
    <div v-if="isLoading" class="spinner-loading is-active is-full-page">
      <div class="loading-background"></div>
      <img src="@/assets/static/images/svg-loaders/ball-triangle.svg"
        class="loading-icon" alt="audio">
    </div>
    <!-- loading end -->
    <form class="col-md-6" @submit.prevent="payOrder">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <table class="table table-striped mb-0">
              <thead>
                <th class="text-start ps-2">品名</th>
                <th class="text-center">數量</th>
                <th class="text-center">單價</th>
              </thead>
              <tbody>
                <tr v-for="item in order.products" :key="item.id">
                  <td class="align-middle text-start">{{ item.product.title }}</td>
                  <td class="align-middle text-center">{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="align-middle text-end">{{ item.final_total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="text-end">總計</td>
                  <td class="text-end">{{ order.total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success fw-bolder">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CustomerChckout',
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${vm.orderId}`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder();
          this.$bus.$emit('message:push', response.data.message, 'success');
        }
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
