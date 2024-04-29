<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div id="auth">
    <div class="row h-100">
      <div class="col-lg-5 col-12">
        <div id="auth-left">
          <h1 class="auth-title">請先登入</h1>
          <p class="auth-subtitle mb-5">
            Log in with your data.
          </p>

          <form @submit.prevent="signin">
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="text"
                class="form-control form-control-xl"
                placeholder="name@example.com"
                v-model="user.username"
                name="username"
              />
              <div class="form-control-icon">
                <i class="bi bi-person"></i>
              </div>
            </div>
            <div class="form-group position-relative has-icon-left mb-4">
              <input
                type="password"
                class="form-control form-control-xl"
                placeholder="Password"
                v-model="user.password"
              />
              <div class="form-control-icon">
                <i class="bi bi-shield-lock"></i>
              </div>
            </div>
            <!-- 保留 -->
            <!-- <div class="form-check form-check-lg d-flex align-items-end">
              <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
              <label class="form-check-label text-gray-600" for="flexCheckDefault">
                Keep me logged in
              </label>
            </div> -->
            <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">Log in</button>
          </form>
        </div>
      </div>
      <div class="col-lg-7 d-none d-lg-block">
        <div id="auth-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const { token, expired } = response.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          vm.$router.push('/admin/products');
        }
      });
    },
  },
};
</script>

<style scoped>
body {
  background-color: #fff;
}

#auth {
  height: 100vh;
  overflow-x: hidden;
}

#auth #auth-right {
  height: 100%;
  background: no-repeat center/100% url(https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D), linear-gradient(90deg, #2d499d, #3f5491);
}

#auth #auth-left {
  padding: 5rem 8rem;
}

#auth #auth-left .auth-title {
  font-size: 4rem;
  margin-bottom: 1rem;
}

#auth #auth-left .auth-subtitle {
  font-size: 1.7rem;
  line-height: 2.5rem;
  color: #a8aebb;
}

#auth #auth-left .auth-logo {
  margin-bottom: 7rem;
}

#auth #auth-left .auth-logo img {
  height: 2rem;
}

@media screen and (max-width: 767px) {
  #auth #auth-left {
    padding: 5rem;
  }
}
</style>
