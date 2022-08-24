<template>
  <div>
    <div v-if="log_in_token !== null" class="profile_div">
      <h1>Edit your profile</h1>
      <input type="email" placeholder="email" ref="email" />
      <input type="text" placeholder="first name" ref="first_name" />
      <input type="text" placeholder="last name" ref="last_name" />
      <input type="text" placeholder="username" ref="username" />
      <input type="password" placeholder="password" ref="password" />
      <button @click="edit_profile_function">Edit</button>
    </div>

    <div v-if="log_in_token === null">
      <h2>You must log in first.</h2>
      <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios"
export default {
    methods: {
        edit_profile_function() {
            axios.request({
                url: `https://innotechfoodie.ml/api/client`,
                headers: {
                    token: `${this.log_in_token}`,
                    method: `PATCH`,
                    data: {
                        email: this.$refs[`email`][`value`],
                        first_name: this.$refs[`first_name`][`value`],
                        last_name: this.$refs[`last_name`][`value`],
                        image_url: `https://media.istockphoto.com/id/619400810/photo/mr-who.webp?s=612x612&w=is&k=20&c=TVND3ti-cQDEE1dkWkaPrNIhv_1vslVWJ-to0g0_Cxw=`,
                        username: this.$refs[`username`][`value`],
                        password: this.$refs[`password`][`value`],
                    }
          },
            }).then((response) => {
                response
            }).catch((error) => {
                error
            })
        }
    },
  data() {
    return {
      log_in_token: null,
    };
  },

  mounted() {
    this.log_in_token = cookies.get(`log_in_token`);
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
