<template>
  <div>
    <h1>Restaurant Items</h1>
    <section v-for="(food, index) in foods" :key="index" class="items_card">
      <div>
        <img :src="food[`image_url`]" alt="" />
        <h4>{{ food[`name`] }}</h4>
        <p>{{ food[`description`] }}</p>
        <p>CAD$ {{ food[`price`] }}</p>
        <div>
            <edit-items></edit-items>
            <button @click="delete_item(index, $event)">Delete Items</button>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import EditItems from './EditItems.vue';
export default {
  components: { EditItems },
    methods: {
        delete_item(index) {
            this.foods.splice(index, 1);
            
        }
    },

  data() {
    return {
      foods: [],
    };
  },
  mounted() {
    axios
      .request({
        url: `https://innotechfoodie.ml/api/menu`,
        headers: {
          "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
        },
        params: {
          restaurant_id: `${cookies.get(`restaurant_id`)}`,
        },
      })
      .then((response) => {
        this.foods = response[`data`];
      })
      .catch((error) => {
        alert(`Sorry, an error have occured. Please reload the page.`);
        error;
      });
  },
};
</script>

<style lang="scss" scoped>
.items_card {
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  border-radius: 5px;
  width: 100%;
  grid-auto-flow: column;

  > div {
    margin: 20px;
    display: grid;
    box-shadow: 8px 8px 16px rgb(191, 191, 191);
    padding: 15px;
    border-radius: 5px;
    width: 30%;
    place-items: center;
    text-align: center;

    > img {
      width: 200px;
      height: 200px;
      max-width: 300px;
      max-height: 300px;
      object-fit: cover;
    }

    > div {
        display: grid;
        grid-auto-flow: column;
        place-items: center;
        column-gap: 20px;
    }
  }
}
</style>
