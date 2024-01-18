<template>
  <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div
      class="offcanvas-md offcanvas-end bg-body-tertiary"
      tabindex="-1"
      id="sidebarMenu"
      aria-labelledby="sidebarMenuLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
        <h6
          class="sidebar-heading d-flex justify-content-between
          align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase"
        >
          <span>管理員</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <svg class="bi"><use xlink:href="#plus-circle" /></svg>
          </a>
        </h6>
        <ul class="nav flex-column mb-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
            <router-link class="nav-link" to="/admin/orders">
              <i class="fas fa-list"></i>
              訂單列表
            </router-link>
            <router-link class="nav-link" to="/admin/ticket">
              <i class="fas fa-ticket-alt"></i>
              優惠券
            </router-link>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between
          align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase"
        >
          <span>模擬功能</span>
          <a class="link-secondary" href="#" aria-label="Add a new report">
            <svg class="bi"><use xlink:href="#plus-circle" /></svg>
          </a>
        </h6>
        <ul class="nav flex-column mb-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_order">
              <i class="fas fa-cart-plus"></i>
              模擬訂單
            </router-link>
          </li>
        </ul>

        <hr class="my-3" />

        <ul class="nav flex-column mb-auto">
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center gap-2" href="#"
              @click.prevent="logout">
              <i class="fas fa-door-closed"></i>
                登出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiderbarView',
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API_PATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
