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
      <button class="btn btn-primary" @click="openTicketModal(true)">建立新的優惠券</button>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>名稱</th>
                  <th>折扣百分比</th>
                  <th>到期日</th>
                  <th>是否啟用</th>
                  <th>編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item) in tickets" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.percent }}%</td>
                  <td>{{ item.due_date }}</td>
                  <td>
                    <span class="text-success fw-bolder" v-if="item.is_enabled">啟用</span>
                    <span v-else>未啟用</span>
                  </td>
                  <td class="d-flex justify-content-between">
                    <button class="btn btn-outline-primary btn-sm"
                      @click="openTicketModal(false, item)">
                      編輯
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
    <Pagination :pagination="pagination" @pageEvent="(page) => getTickets(page)"/>
    <!-- Modal -->
    <div class="modal fade" id="ticketModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span class="white">新增優惠券</span>
            </h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"
              @click="hideTicketModal">
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-3">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempTicket.title">
            </div>
            <div class="form-group mb-3">
              <label for="code">優惠碼</label>
              <input type="text" class="form-control" id="code"
                placeholder="請輸入優惠碼" v-model="tempTicket.code">
            </div>
            <div class="form-group mb-3">
              <label for="due_date">到期日</label>
              <FlatPickr
                v-model="tempTicket.due_date"
                class="form-control"
                placeholder="請輸入到期日"
                name="date"/>
            </div>
            <div class="form-group mb-3">
              <label for="percent">折扣百分比</label>
              <input type="number" class="form-control" id="percent"
                placeholder="請輸入折扣百分比" v-model="tempTicket.percent">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempTicket.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
              @click="hideTicketModal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateTicket">
              <template v-if="isNew">
              確認
              </template>
              <template v-else>
                更新優惠券
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Pagination from '@/components/Pagination.vue';
// import { ref } from 'vue';

export default {
  name: 'TicketView',
  components: {
    Pagination,
  },
  data() {
    return {
      tickets: [],
      tempTicket: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: '',
      },
      isNew: false,
      isLoading: false,
      pagination: {},
      due_date: new Date(),
    };
  },
  methods: {
    getTickets(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.tickets = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    openTicketModal(isNew, item) {
      if (isNew) {
        this.tempTicket = {};
        this.isNew = true;
      } else {
        this.tempTicket = { ...item };
        this.isNew = false;
      }

      const ticketModal = document.getElementById('ticketModal');
      const modal = Modal.getOrCreateInstance(ticketModal);
      modal.show();
    },
    hideTicketModal() {
      const modalElementById = document.getElementById('ticketModal');
      const modal = Modal.getOrCreateInstance(modalElementById);
      modal.hide();
    },
    updateTicket() {
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
      let htttpMethod = 'post';
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempTicket.id}`;
        htttpMethod = 'put';
      }
      this.$http[htttpMethod](api, { data: vm.tempTicket }).then((response) => {
        if (response.data.success) {
          vm.hideTicketModal();
          vm.getTickets();
        } else {
          vm.hideTicketModal();
          vm.getTickets();
          // TODO: 錯誤訊息提示
        }
      });
    },
  },
  created() {
    this.getTickets();
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempTicket.due_date = timestamp;
    },
  },
};
</script>
