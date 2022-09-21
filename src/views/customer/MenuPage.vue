<template>
  <div>
    <div v-if="log_in_token !== null || sign_in_token !== null">
      <section class="mobile">
        <div class="header_div">
          <div class="header_links"> 
            <router-link to="/profile">Edit Profile</router-link>
            <router-link to="/delete">Delete Profile</router-link>
            <button @click="log_out_function">Log Out</button>
          </div>
          <div class="cart">
            <router-link to="/cart-order"><img src="https://www.reshot.com/preview-assets/icons/8DYPSUXJBK/shopping-cart-8DYPSUXJBK.svg" alt=""></router-link>
          </div>
        </div>
        <div class="menu_items">
          <menu-items></menu-items>
        </div>
      </section>
    </div>

    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import MenuItems from "@/components/customer/MenuItems.vue";
export default {
  components: { MenuItems },
  methods: {
    log_out_function() {
      cookies.remove(`log_in_token`);
      this.$router.push(`/`);
    },
  },
  data() {
    return {
      log_in_token: null,
      sign_in_token: null
    };
  },
  mounted() {
    this.log_in_token = cookies.get(`log_in_token`);
    this.sign_in_token = cookies.get(`sign_in_token`);
  },
};
</script>

<style style scoped lang="scss">
.header_div {
  display: grid;
  height: 15vh;
  place-items: center;
  margin-top: 10px;

  > .header_links {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    column-gap: 20px;

    >button {
            cursor: pointer;
      border: none;
      background: #13542D;
      color: white;
      border-radius: 5px;
      justify-self: end;
      width: 80px;
      height: 35px;
    }
  }

  > .cart {
    margin-top: 30px;
  }
}

img {
  width: 40px;
}
</style>
