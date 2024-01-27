<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <!-- loading start -->
    <div v-if="isLoading" class="spinner-loading is-active is-full-page">
      <div class="loading-background"></div>
      <img src="@/assets/static/images/svg-loaders/ball-triangle.svg"
        class="loading-icon" alt="audio">
    </div>
    <!-- loading end -->
    <div class="text-end my-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>分類</th>
                  <th>產品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th class="text-center">編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in products" :key="item.id">
                  <td class="text-bold-500">{{ item.category }}</td>
                  <td>{{ item.title }}</td>
                  <td class="text-end text-bold-500">{{ item.origin_price | currency }}</td>
                  <td class="text-end">{{ item.price | currency }}</td>
                  <td>
                    <span class="text-success fw-bolder" v-if="item.is_enabled">啟用</span>
                    <span v-else>未啟用</span>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-outline-primary btn-sm me-4"
                      @click="openModal(false, item)">
                      編輯
                    </button>
                    <button class="btn btn-danger btn-sm" @click="openDeleteModal(item)">
                      刪除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Page -->
    <Pagination :pagination="pagination" @pageEvent="(page) => getProducts(page)"/>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span class="white">新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
              @click="hideModal('productModal')">
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group mb-3">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">

                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-solid fa-cog fa-spin fa-spin-reverse"
                    v-if="status.fileUploadLoading"></i>
                  </label>
                  <!-- file name 綁定參考 https://github.com/inertiajs/inertia/issues/605 -->
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile"
                    @input="tempProduct.image = $event.target.files[0].name">
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid mt-2" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group mb-3">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6 mb-3">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6 mb-3">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6 mb-3">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group mb-3">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group mb-3">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempProduct.is_enabled"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
              @click="hideModal('productModal')">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span class="white">刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
              @click="hideModal('delProductModal')"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
              @click="hideModal('delProductModal')">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'ProductsView',
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploadLoading: false,
      },
      pagination: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    // 新增、編輯打開 model
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      // 不使用載入 jouery lib 打開 modal 的方法 https://yukihiew.com/vue-bootstrap-modal-open-by-javascript/
      const productModal = document.getElementById('productModal');
      const modal = Modal.getOrCreateInstance(productModal);
      modal.show();
    },
    hideModal(action = 'productModal') {
      const modalElementById = document.getElementById(action);
      const modal = Modal.getOrCreateInstance(modalElementById);
      modal.hide();
    },
    // 更新產品
    updateProduct() {
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      let htttpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
        htttpMethod = 'put';
      }
      this.$http[htttpMethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          vm.hideModal('productModal');
          vm.getProducts();
        } else {
          vm.hideModal('productModal');
          vm.getProducts();
          // TODO: 錯誤訊息提示
        }
      });
    },
    // 刪除二次確認 modal
    openDeleteModal(item) {
      this.tempProduct = { ...item };
      const delProductModal = document.getElementById('delProductModal');
      const deleteModal = Modal.getOrCreateInstance(delProductModal);
      deleteModal.show();
    },
    // 刪除產品
    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.hideModal('delProductModal');
          vm.getProducts();
        } else {
          vm.hideModal('delProductModal');
          vm.getProducts();
          // TODO: 錯誤訊息提示
        }
      });
    },
    // 上傳圖片
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      vm.status.fileUploadLoading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.data.success) {
            // 強制寫入確保具有雙向綁定
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            this.$bus.$emit('message:push', response.data.message, 'danger');
          }
          vm.status.fileUploadLoading = false;
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
