<template>
    <div>
        <display-order-customer></display-order-customer>
        <cart-order-customer></cart-order-customer>
    </div>
</template>

<script>
import DisplayOrderCustomer from '@/components/order-customer/DisplayOrderCustomer.vue'
import CartOrderCustomer from '@/components/order-customer/CartOrderCustomer.vue'
    export default {
  components: { DisplayOrderCustomer, CartOrderCustomer },
        
    }
</script>

<style lang="scss" scoped>

</style>