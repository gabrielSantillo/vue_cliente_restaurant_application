<template>
  <div>
    <section class="restaurant_info">
      <h1>{{ name }}</h1>
      <div>
        <img :src="banner_url" />
        <img :src="profile_url" class="profile_img" />
      </div>

      <div class="info_card red">
        <div>
          <p>{{ bio }}</p>
          <h2>{{ city }}</h2>
        </div>

        <div>
          <p>{{ address }}</p>
          <p>{{ email }}</p>
          <p>{{ phone_number }}</p>
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
      container: false,
    };
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
        this.address = response[`data`][0][`address`];
        this.banner_url = response[`data`][0][`banner_url`];
        this.bio = response[`data`][0][`bio`];
        this.city = response[`data`][0][`city`];
        this.email = response[`data`][0][`email`];
        this.name = response[`data`][0][`name`];
        this.phone_number = response[`data`][0][`phone_number`];
        this.profile_url = response[`data`][0][`profile_url`];
        response[`data`][0][`restaurant_id`];
      })
      .catch((error) => {
        alert(`Sorry, an error have occured. Please reload the page.`);
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.restaurant_info {
  display: grid;
  margin-top: 50px;
  > h1 {
    text-align: center;
  }

  > div {
    > .profile_img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50px;
      transform: translateY(-50px) translateX(25px);
    }
  }

  > .info_card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    border-radius: 5px;
    box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
    padding: 30px;
    margin: 20px;
    width: 280px;
  }

    >.red {
    border-left: 3px solid #ad1839;
  }
}

img {
  width: 375px;
}
</style>
