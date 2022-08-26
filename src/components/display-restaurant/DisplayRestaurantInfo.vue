<template>
    <div>
        <h1>Restaurant Info</h1>
    </div>
</template>

<script>
import axios from "axios"
import cookies from "vue-cookies"
    export default {
        mounted () {
            axios.request({
                url: ` https://innotechfoodie.ml/api/restaurant`,
                headers: {
                    "x-api-key": `RevyoqeHMCwaqRcUfmDC`,
                    restaurant_id: `${cookies.get(`restaurant_id`)}`
        },
            }).then((response) => {
               let name =  response[`data`][`name`];
               name
            }).catch((error) => {
                error
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>