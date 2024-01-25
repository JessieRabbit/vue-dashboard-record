import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/components/Dashboard.vue';
import Products from '@/views/Products.vue';
import Orders from '@/views/Orders.vue';
import Ticket from '@/views/Ticket.vue';
import CustomerOrder from '@/views/CustomerOrders.vue';
import CustomerCheckout from '@/views/CustomerCheckout.vue';

Vue.use(VueRouter);

const routes = [
  // 輸入不存在頁面導到登入頁面
  {
    path: '*',
    redirect: 'login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: 'ticket',
        name: 'Ticket',
        component: Ticket,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    component: Dashboard,
    children: [
      {
        path: 'customer_order',
        name: 'CustomerOrders',
        component: CustomerOrder,
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
