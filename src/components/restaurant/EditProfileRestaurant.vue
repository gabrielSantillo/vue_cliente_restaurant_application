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
 mounted() {
    /* axios request to the restaurant API */
    axios
      .request({
        url: ` https://innotechfoodie.ml/api/restaurant`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        params: {
          restaurant_id: `${cookies.get(`restaurant_id`)}`,
        },
      })
      .then((response) => {
        /* on success grab all restaurant information */
        this.default_address = response[`data`][0][`address`];
        this.default_bio = response[`data`][0][`bio`];
        this.default_city = response[`data`][0][`city`];
        this.defaul_email = response[`data`][0][`email`];
        this.default_name = response[`data`][0][`name`];
        this.default_phone_number = response[`data`][0][`phone_number`];
      })
      .catch((error) => {
        /* on failure show a message */
        alert(`Sorry, an error have occured. Please reload the page.`);
        error;
      });
  },
  methods: {
    /* this function edit the restaurant user profile */
    edit_profile_function() {
      if(this.$refs[`email`][`value`] != "") {
        this.defaul_email = this.$refs[`email`][`value`];
      }

      if(this.$refs[`name`][`value`] != "") {
        this.default_name = this.$refs[`name`][`value`];
      }

      if(this.$refs[`address`][`value`] != "") {
        this.default_address = this.$refs[`address`][`value`];
      }

      if(this.$refs[`phone`][`value`] != "") {
        this.default_phone_number = this.$refs[`phone`][`value`];
      }

      if(this.$refs[`bio`][`value`] != "") {
        this.default_bio = this.$refs[`bio`][`value`]
      }

      if(this.$refs[`city`][`value`] != "") {
        this.default_city = this.$refs[`city`][`value`]
      }

      if(this.$refs[`password`][`value`] != "") {
        this.default_password = this.$refs[`password`][`value`]
      }

      /* axios request to the restaurat API */
      axios
        .request({
          url: `https://innotechfoodie.ml/api/restaurant`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`restaurant_token`)}`,
          },
          method: `PATCH`,
          /* the data being updated */
          data: {
            email: this.defaul_email,
            name: this.default_name,
            address: this.default_address,
            phone_number: this.default_phone_number,
            bio: this.default_bio,
            city: this.default_city,
            profile_url: `https://images.pexels.com/photos/8477063/pexels-photo-8477063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
            banner_url: `https://images.pexels.com/photos/5858047/pexels-photo-5858047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
            password: this.default_password,
          },
        })
        .then((response) => {
          response;
          /* on success show a success message and set the profile updated variable to true */
          alert(`You have updated your profile information.`);
          this.profile_updated = true;
        })
        .catch((error) => {
          error;
          /* on failure show a message */
          alert(`Sorry, an error have occured. Please, try again.`);
        });
    },
  },
  data() {
    return {
      profile_updated: false,
      defaul_email: null,
      default_name: null,
      default_address: null,
      default_phone_number: null,
      default_bio: null,
      default_city: null,
      default_password: null
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
