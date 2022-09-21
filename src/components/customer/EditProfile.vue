<template>
  <div>
    <div class="profile_div" v-if="profile_updated === false">
      <router-link to="/menu">Menu</router-link>
      <h1>Edit your profile</h1>

      <input type="email" placeholder="email" ref="email" />
      <input type="text" placeholder="first name" ref="first_name" />
      <input type="text" placeholder="last name" ref="last_name" />
      <input type="text" placeholder="username" ref="username" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="edit_profile_function">Edit</button>
    </div>

    <div v-else>
      <h1>Back to the Menu</h1>
      <router-link to="/menu">Menu</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/client`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
          token: `${cookies.get(`sign_in_token`)}`,
        },
        params: {
          client_id: parseInt(cookies.get("client_id")),
        },
      })
      .then((response) => {
        /* on success store the data sent back */
        this.default_email = response[`data`][0][`email`];
        this.default_first_name = response[`data`][0][`first_name`];
        this.default_last_name = response[`data`][0][`last_name`];
        this.default_username = response[`data`][0][`username`];
        this.default_password = response[`data`][0][`password`];
      })
      .catch((error) => {
        error;
      });
  },
  data() {
    return {
      /* setting profile_updated to false */
      profile_updated: false,
      /* setting to null all this datas that will be the default data */
      default_email: null,
      default_first_name: null,
      default_last_name: null,
      default_image_url: null,
      default_username: null,
      default_password: null,
    };
  },
  methods: {
    back_to_menu() {
      /* function that leave the user to the menu page */
      this.$rooter.push(`menu`);
    },
    edit_profile_function() {
      if (this.$refs[`email`][`value`] !== '') {
        this.default_email = this.$refs[`email`][`value`];
      }

      if (this.$refs[`first_name`][`value`] !== '') {
        this.default_first_name = this.$refs[`first_name`][`value`];
      }

      if (this.$refs[`last_name`][`value`] !== '') {
        this.default_last_name = this.$refs[`last_name`][`value`];
      }

      if (this.$refs[`username`][`value`] !== '') {
        this.default_username = this.$refs[`username`][`value`];
      }

      if (this.$refs[`password`][`value`] !== '') {
        this.default_password = this.$refs[`password`][`value`];
      }

      console.log(this.default_email);
      console.log(this.default_first_name);
      console.log(this.default_last_name);
      console.log(this.default_username);
      console.log(this.default_password);
      
      /* axios request to the client API */
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
          method: `PATCH`,
          /* sending this data to update */
          data: {
            email: this.default_email,
            first_name: this.default_first_name,
            last_name: this.default_last_name,
            image_url: `https://media.istockphoto.com/id/619400810/photo/mr-who.webp?s=612x612&w=is&k=20&c=TVND3ti-cQDEE1dkWkaPrNIhv_1vslVWJ-to0g0_Cxw=`,
            username: this.default_username,
            password: this.default_password,
          },
        })
        .then((response) => {
          /* on success show a message and set the variable profile_updated to true */
          response;
          alert(`You have updated your profile information.`);
          this.profile_updated = true;
        })
        .catch((error) => {
          /* on failure show a message */
          error;
          alert(`Sorry, an error have occured. Please, try again.`);
        });
    },
  },
};
</script>

<style style scoped lang="scss">
.profile_div {
  display: grid;
  place-items: center;
  row-gap: 10px;

  > img {
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

  > button {
    cursor: pointer;
    margin-top: 10px;
    border: none;
    background: #13542d;
    color: white;
    padding: 10px;
    width: 100px;
    border-radius: 5px;
  }

  > button:hover {
    background: #196838;
  }

  > button:active {
    transform: scale(0.95);
  }
}
</style>
