<template>
  <div>
    <div class="profile_div" v-if="profile_updated === false">
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
    data() {
        return {
            profile_updated: false
        }
    },
  methods: {
    edit_profile_function() {
      axios
        .request({
          url: `https://innotechfoodie.ml/api/client`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
          method: `PATCH`,
          data: {
            email: this.$refs[`email`][`value`],
            first_name: this.$refs[`first_name`][`value`],
            last_name: this.$refs[`last_name`][`value`],
            image_url: `https://media.istockphoto.com/id/619400810/photo/mr-who.webp?s=612x612&w=is&k=20&c=TVND3ti-cQDEE1dkWkaPrNIhv_1vslVWJ-to0g0_Cxw=`,
            username: this.$refs[`username`][`value`],
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
};
</script>

<style scoped>
.profile_div {
  display: grid;
  grid-auto-flow: row;
  place-items: center;
  row-gap: 10px;
}
</style>
