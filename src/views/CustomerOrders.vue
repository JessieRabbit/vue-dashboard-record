<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div>
    <!-- loading start -->
    <div v-if="isLoading" class="spinner-loading is-active is-full-page">
      <div class="loading-background"></div>
      <img src="@/assets/static/images/svg-loaders/ball-triangle.svg"
        class="loading-icon" alt="audio">
    </div>
    <!-- loading end -->
    <div class="row mt-4 border-bottom">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover;
            background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">
                <a href="#" class="text-dark text-decoration-none">{{ item.title }}</a>
              </h5>
              <h5><span class="badge bg-secondary ml-2">{{ item.category }}</span></h5>
            </div>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <div class="h6 text-decoration-line-through" v-if="item.price">
                原價 {{ item.origin_price }} 元
              </div>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id, item.qty)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center" v-if="cart.carts && cart.carts.length">
      <div class="w-50">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <table class="table table-hover mb-0">
                <thead>
                  <th></th>
                  <th>品名</th>
                  <th>數量</th>
                  <th width="120">單價</th>
                </thead>
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id" >
                    <td class="align-middle">
                      <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="removeCartItem(item.id)">
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                    <td class="align-middle">
                      {{ item.product.title }}
                      <div class="text-success" v-if="item.coupon">
                        已套用優惠券
                      </div>
                    </td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-end">{{ item.final_total | currency }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-end">總計</td>
                    <td class="text-end">{{ cart.total | currency }}</td>
                  </tr>
                  <tr v-if="cart.final_total !== cart.total">
                    <td colspan="3" class="text-end text-success">折扣價</td>
                    <td class="text-success text-end">{{ cart.final_total | currency }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control me-4" placeholder="請輸入優惠碼" v-model="coupon_code">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCuponCode">
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center" v-if="cart.carts && cart.carts.length">
      <validation-observer class="col-md-6" v-slot="{ invalid }">
        <form @submit.prevent="crateOrder">
          <validation-provider rules="required|email" v-slot="{ errors, classes }">
            <div class="form-group">
               <!-- 輸入框 -->
              <label for="email">Email</label>
              <input id="email" type="email" name="email" v-model="form.user.email"
                  class="form-control" :class="classes" placeholder="輸入email">
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group mt-3">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" name="name" id="username"
                :class="classes"
                v-model="form.user.name" placeholder="輸入姓名">
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required|digits:10" v-slot="{ errors, classes }">
            <div class="form-group mt-3">
              <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" name="tel" id="usertel"
                :class="classes"
                v-model="form.user.tel" placeholder="請輸入電話">
              <span class="invalid-feedback">
                {{ errors[0] }}
              </span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group mt-3">
              <label for="useraddress">收件人地址</label>
              <input type="text" class="form-control" name="address" id="useraddress"
                :class="classes"
                v-model="form.user.address"
                placeholder="請輸入地址">
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <div class="form-group mt-3">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10"
              v-model="form.message"></textarea>
          </div>
          <div class="text-end mt-3">
            <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
          </div>
        </form>
      </validation-observer>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
              @click="hideModal('productModal')">
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-end mt-3">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select class="form-select" aria-label="Default select example"
              v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'CustomerOrders',
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      isLoading: false,
      cart: {},
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        const productModal = document.getElementById('productModal');
        const modal = Modal.getOrCreateInstance(productModal);
        modal.show();
        vm.status.loadingItem = '';
      });
    },
    hideModal(action = 'productModal') {
      const modalElementById = document.getElementById(action);
      const modal = Modal.getOrCreateInstance(modalElementById);
      modal.hide();
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then(() => {
        vm.getCarts();
        vm.hideModal('productModal');
        vm.status.loadingItem = '';
      });
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(() => {
        vm.getCarts();
        vm.isLoading = false;
      });
    },
    addCuponCode() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then((response) => {
        if (!response.data.success) {
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
        vm.getCarts();
        vm.isLoading = false;
      });
    },
    crateOrder() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const vm = this;
      const order = vm.form;
      this.$http.post(api, { data: order }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCarts();
  },
};
</script>
