<template>
  <div>
    <section>
      <div class="food">
        <img :src="image_url" />
        <h4>{{ name }}</h4>
        <p>{{ description }}</p>
        <p>CAD$ {{ price }}</p>
      </div>

      <div class="input">
        <input
          type="url"
          placeholder="image url of the product"
          ref="img_url"
        /><input type="text" placeholder="name" ref="name" />
        <input type="text" placeholder="Description" ref="description" />
        <input type="number" placeholder="price" ref="price" />
        <button @click="edit_item">Edit item</button>
      </div>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
export default {
  methods: {
    /* this function edit the item making a axios request to the menu API */
    edit_item() {
      if(this.$refs[`description`][`value`] != "") {
        this.description = this.$refs[`description`][`value`]
      }

      if(this.$refs[`img_url`][`value`] != "") {
        this.image_url = this.$refs[`img_url`][`value`]
      }

      if(this.$refs[`name`][`value`] != "") {
        this.name = this.$refs[`name`][`value`]
      }

      if(this.$refs[`price`][`value`] != "") {
        this.price = this.$refs[`price`][`value`]
      }
      axios
        .request({
          url: `https://innotechfoodie.ml/api/menu`,
          headers: {
            "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
            token: `${cookies.get(`restaurant_token`)}`,
          },
          method: `PATCH`,
          /* data sent to be updated */
          data: {
            description: this.description,
            image_url: this.image_url,
            name: this.name,
            price: this.price,
            menu_id: `${this.menu_id}`,
          },
        })
        .then((response) => {
          response;
          /* on success set the variable to true */
        alert("You have eddited the item");

        let food = {
          description: this.description,
          image_url: this.image_url,
          name: this.name,
          price: this.price,
          menu_id:`${this.menu_id}`
        }

        let food_json = JSON.stringify(food);
        cookies.set(`food_id`, food_json);
        })
        .catch((error) => {
          error;
          /* on failure show the user a message */
          alert(`Sorry, an error have occured. Try again.`);
        });
    },
  },
  data() {
    /* data waiting to be setted as the food that will be editted */
    return {
      name: undefined,
      description: undefined,
      image_url: undefined,
      price: undefined,
      menu_id: undefined,
    };
  },
  mounted() {
    /* in mountain grab all food informations */
    let food_object = cookies.get(`food_id`);
    this.name = food_object[`name`];
    this.description = food_object[`description`];
    this.image_url = food_object[`image_url`];
    this.price = food_object[`price`];
    this.menu_id = food_object[`id`];
  },
};
</script>

<style lang="scss" scoped>
section {
  display: grid;
  grid-template-rows: 1fr 1fr;
  column-gap: 30px;
  margin-top: 50px;
  height: 350px;
}

.food {
  text-align: center;
}

img {
  width: 200px;
  height: 200px;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
}

.input {
  display: grid;
  height: 60%;
  place-items: center;
  margin-bottom: 50px;

  > input {
    height: 30px;
    width: 250px;
    margin: 5px;
  }
}

button {
  margin-top: 20px;
}

.response {
    display: grid;
    place-items: center;
    text-align: center;
}
</style>
