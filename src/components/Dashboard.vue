<template>
  <div>
    <Alert/>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Siderbar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Siderbar from './Siderbar.vue';
import Navbar from './Navbar.vue';
import Alert from './AlertMessage.vue';

export default {
  name: 'DashboardView',
  components: {
    Siderbar,
    Navbar,
    Alert,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>
