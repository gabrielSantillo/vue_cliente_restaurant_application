<template>
  <div>
    <section>
      <div>
        <img :src="image_url" />
        <h4>{{ name }}</h4>
        <p>{{ description }}</p>
        <p>CAD$ {{ price }}</p>
      </div>
        
      <div>
        <h1>hi</h1>
      </div>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
export default {
  data() {
    return {
      name: undefined,
      description: undefined,
      image_url: undefined,
      price: undefined,
    };
  },
  mounted() {
    let food_object = cookies.get(`food_id`);
    this.name = food_object[`name`];
    this.description = food_object[`description`];
    this.image_url = food_object[`image_url`];
    this.price = food_object[`price`];
  },
};
</script>

<style lang="scss" scoped>
section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    text-align: center;
}

img {
  width: 200px;
  height: 200px;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
}
</style>
