<template>
  <div>
    <section class="register">
      <h1>Sign Up</h1>
      <input type="email" placeholder="email" ref="email" />
      <input type="text" placeholder="name" ref="name" />
      <input type="address" placeholder="address" ref="address" />
      <input
        type="text"
        placeholder="phone number as ###-###-####"
        ref="phone"
      />
      <input type="text" placeholder="bio" ref="bio" />
      <input
        type="text"
        placeholder="Calgary, Vancouver or Toronto"
        ref="city"
      />
      <input type="password" placeholder="password" ref="password" />
      <button @click="register_restaurant">Register</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
export default {
  methods: {
    register_restaurant() {
      axios.request({
        url: `https://innotechfoodie.ml/api/restaurant`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        method: `POST`,
        data: {
            email: this.$refs[`email`][`value`],
            name: this.$refs[`name`][`value`],
            address: this.$refs[`address`][`value`],
            phone_number: this.$refs[`phone`][`value`],
            bio: this.$refs[`bio`][`value`],
            city: this.$refs[`city`][`value`],
            profile_url: `https://images.pexels.com/photos/8477063/pexels-photo-8477063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
            banner_url: `https://images.pexels.com/photos/5858047/pexels-photo-5858047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
            password: this.$refs[`password`][`value`],
        }
      }).then((response) => {
        cookies.set(`restaurant_id`, response[`data`][`restaurantId`]);
        cookies.set(`sign_in_token_restaurant`, response[`data`][`token`]);
        this.$router.push(`/login-restaurant`);
        
      }).catch((error) => {
        error
        alert(`Sorry, an error have occured. Please try again.`)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
    display: grid;
    place-items: center;
    row-gap: 10px;
    >input {
        width: 15%;
        min-width: 200px;
    }
}
</style>
