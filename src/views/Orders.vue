<template>
  <div>
    <!-- loading start -->
    <div v-if="isLoading" class="spinner-loading is-active is-full-page">
      <div class="loading-background"></div>
      <img src="@/assets/static/images/svg-loaders/ball-triangle.svg"
        class="loading-icon" alt="audio">
    </div>
    <!-- loading end -->

    <div class="row">
      <div class="col-12">
        <div class="card">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th>應付金額</th>
                <th>是否付款</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in orders" :key="item.id">
                <td>{{ item.create_at | date  }}</td>
                <td>{{ item.user.email }}</td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="(product, i) in item.products" :key="i">
                      {{ product.product.title }} 數量：{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td class="text-end">{{ item.total | currency }}</td>
                <td>
                  <span class="text-success fw-bolder" v-if="item.is_paid">已付款</span>
                  <span v-else>尚未啟用</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Page -->
    <Pagination :pagination="pagination" @pageEvent="(page) => getOrders(page)"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'OrdersView',
  components: {
    Pagination,
  },
  data() {
    return {
      orders: [],
      isLoading: false,
      pagination: {},
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
