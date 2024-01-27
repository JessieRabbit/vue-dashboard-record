import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// 降版本 https://github.com/ankurk91/vue-loading-overlay/issues/83
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 降版本對應 vue 2.x https://github.com/logaretm/vee-validate
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure,
} from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json';
import * as rules from 'vee-validate/dist/rules';

import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Loading', Loading);
Vue.component('FlatPickr', FlatPickr);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;

// vue cmd for windows and vue create 建置 vue2 安裝方法
// https://www.youtube.com/watch?v=mL4ItgfyL6w
// https://ithelp.ithome.com.tw/articles/10280361
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;

    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
