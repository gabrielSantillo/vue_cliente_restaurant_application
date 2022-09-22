<template>
  <div class="sign_up">
      <h1>Sign Up as Restaurant</h1>
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
      <button @click="register_restaurant">Sign Up</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
export default {
  methods: {
    /* this function sign up the restaurant user */
    register_restaurant() {
      axios.request({
        url: `https://innotechfoodie.ml/api/restaurant`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        method: `POST`,
        /* the data sent with the restautant informatio */
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
        /* on success setting a cookie with the restaurant id */
        cookies.set(`restaurant_id`, response[`data`][`restaurantId`]);
        /* setting a cookie with the sign in token */
        cookies.set(`restaurant_token`, response[`data`][`token`]);
        this.$router.push(`/dashboard-restaurant`);
        
      }).catch((error) => {
        error
        /* on failure show a message */
        alert(`Sorry, an error have occured. Please try again.`)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.sign_up {
  display: grid;
  place-items: center;
  row-gap: 10px;

  > input {
    min-width: 250px;
    max-width: 350px;
    border: 1.5px solid rgb(207, 207, 207);
    min-height: 20px;
    padding: 5px;
    border-radius: 5px;
  }

      > input::placeholder {
      color: rgb(207, 207, 207);
    }

    >button {
      cursor: pointer;
      margin-top: 10px;
      border: none;
      background: #ad1839;
      color: white;
      padding: 10px;
      width: 100px;
      border-radius: 5px;
    }

    >button:hover {
      background: #bc2848;
    }

    >button:active {
      transform: scale(.95);
    }
}
</style>
