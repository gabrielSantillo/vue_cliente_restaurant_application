<template>
  <div>
    <div class="profile_div">
      <router-link to="/dashboard-restaurant">Dashboard</router-link>
      <h1>Edit your profile</h1>
      
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
        <button @click="edit_profile_function">Edit</button>
    </div>

  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    edit_profile_function() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token_restaurant`)}`,
          },
          method: `PATCH`,
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
          },
        })
        .then((response) => {
          response;
          alert(`You have updated your profile information.`);
          this.profile_updated = true;
        })
        .catch((error) => {
          error;
          alert(`Sorry, an error have occured. Please, try again.`);
        });
    },
  },
  data() {
    return {
      profile_updated: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile_div {
  display: grid;
  place-items: center;
  row-gap: 10px;

  >img {
    width: 50px;
    margin-bottom: 30px;
    justify-self: start;
  }

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
      background: #13542D;
      color: white;
      padding: 10px;
      width: 100px;
      border-radius: 5px;
    }

    >button:hover {
      background: #196838;
    }

    >button:active {
      transform: scale(.95);
    }
}
</style>
