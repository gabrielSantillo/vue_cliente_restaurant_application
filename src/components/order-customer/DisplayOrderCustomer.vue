<template>
  <div>
    <div>
      <div class="header">
        <h1>Your Order</h1>
        <router-link to="/restaurant-menu-options">Menu</router-link>
      </div>

      <section class="order_card"
      v-for="food in foods" :key="food[`order_id`]">
        <div>
          <h3>{{ food[`name`] }}</h3>
          <h4>CAD$ {{ food[`price`] }}</h4>
          <div v-if="food[`is_confirmed`]">
            <p>Confirmed</p>
          </div>
            <div v-else>
                <p>Not confirmed</p>
            </div>
          
          <div v-if="food[`is_complete`]">
            <p>Completed</p>
          </div>
            <div v-else>
                <p>Not completed</p>
            </div>
          
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies";
export default {
  data() {
    return {
      foods: [],
    };
  },

  mounted() {
    axios
        .request({
          url: `https://innotechfoodie.ml/api/client-order`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`log_in_token`)}`,
          },
        })
        .then((response) => {
          this.foods = response[`data`];
        })
        .catch((error) => {
          error;
          alert(`Sorry an error have occured. Please, refresh the page`);
        });
  },
};
</script>

<style lang="scss" scoped>
.order_card {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-auto-flow: column;
  place-items: center;

  > div {
    > img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }

    > p {
      width: 300px;
    }
  }
}

.header {
  display: grid;
  grid-template-columns: 5fr 1fr;
  place-items: center;
  text-align: center;
}
</style>
