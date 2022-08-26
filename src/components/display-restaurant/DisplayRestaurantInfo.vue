<template>
  <div>
    <section>
        <div>
            <h1>{{name}}</h1>
            <img :src="profile_url">
        </div>

        <div>
            <img :src="banner_url">
            <p>{{bio}}</p>
        </div>

        <div>
            <h2>{{city}}</h2>
            <div>
                <p>{{address}}</p>
                <p>{{email}}</p>
                <p>{{phone_number}}</p>
            </div>
        </div>
        
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
    data() {
        return {
            address: undefined,
            banner_url: undefined,
            bio: undefined,
            city: undefined,
            email: undefined,
            name: undefined,
            phone_number: undefined,
            profile_url: undefined,
            restaurant_id: undefined,
            container: false
        }
    },
  mounted() {
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
       this.address = response[`data`][0][`address`]
       this.banner_url = response[`data`][0][`banner_url`]
        this.bio = response[`data`][0][`bio`]
       this.city = response[`data`][0][`city`]
       this.email = response[`data`][0][`email`]
       this.name = response[`data`][0][`name`]
       this.phone_number = response[`data`][0][`phone_number`]
       this.profile_url = response[`data`][0][`profile_url`]
       response[`data`][0][`restaurant_id`]
      })
      .catch((error) => {
        alert(`Sorry, an error have occured. Please reload the page.`)
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
img {
    max-width: 300px;
}
</style>
