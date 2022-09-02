<template>
  <div class="body">
    <section class="mobile">
      <h1>Do Not Skip the Food</h1>
      <div>
        <router-link to="/login">Customer</router-link>
        <h2>Or</h2>
        <router-link to="/login-restaurant">Restaurant</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Garamond", "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.body {
  min-height: 100vh;
  place-items: center;
  width: 100%;
}

img,
svg,
iframe {
  width: 100%;
}

.mobile {
    display: grid;
    place-items: center;
    grid-template-rows: 1fr 2fr;
    height: 100vh;
    text-align: center;

    > h1 {
        font-size: 3rem;
        margin: 0 20%;
        margin-top: 20%;
    }

    > div {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        row-gap: 50px;
    }
}
</style>
