<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
  <div>
    <Alert/>
    <div class="container-fluid">
      <Siderbar/>
      <main id="main">
        <header class="mb-3">
          <a href="#" class="burger-btn d-block d-xl-none">
            <i class="bi bi-justify fs-3"></i>
          </a>
        </header>
        <div class="page-heading">
          <router-view></router-view>
        </div>
        <Footer/>
      </main>
    </div>
  </div>
</template>

<script>
import setThemeGlobal from '../assets/static/js/components/dark';
import onFirstLoadGlobal from '../assets/static/js/components/sidebar';
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
  mounted() {
    // 不使用 DOMContentLoaded 解決方法
    // https://stackoverflow.com/questions/59957400/functionality-like-document-ready-with-vue-js
    // https://stackoverflow.com/questions/77007860/where-does-domcontentloaded-event-listener-fit-in-a-vuejs-model
    const THEME_KEY = 'theme';
    this.$nextTick(() => {
      // dark
      const toggler = document.getElementById('toggle-dark');
      const theme = localStorage.getItem(THEME_KEY);
      if (toggler) {
        toggler.checked = theme === 'dark';

        toggler.addEventListener('input', (e) => {
          setThemeGlobal(e.target.checked ? 'dark' : 'light', true);
        });
      }

      // siderbar
      const sidebarEl = document.getElementById('sidebar');
      if (document.readyState !== 'loading') {
        onFirstLoadGlobal(sidebarEl);
      } else {
        window.addEventListener('DOMContentLoaded', () => onFirstLoadGlobal(sidebarEl));
      }

      if (sidebarEl) {
        // initialize
        const sidebar = new window.Sidebar(sidebarEl);
        console.log('sidebar', sidebar);
      }
    });
  },
};
</script>
