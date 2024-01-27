<template>
  <div>
    <Alert/>
    <div class="container-fluid">
      <Siderbar/>
      <main id="main">
        <div class="page-heading">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Siderbar from './Siderbar.vue';
import Alert from './AlertMessage.vue';
import Footer from './Footer.vue';

export default {
  name: 'DashboardView',
  components: {
    Siderbar,
    Alert,
    Footer,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>
