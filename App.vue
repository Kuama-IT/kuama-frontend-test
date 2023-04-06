<script setup>
  import { ref } from "vue";
  import payments from './assets/json/payments.json';
  import PaymentForm from './components/PaymentForm.vue';

  const paymentBeneficiary = ref({})

  payments.details.forEach(payment => {
    paymentBeneficiary.value[payment.beneficiary_entity_type] = paymentBeneficiary.value[payment.beneficiary_entity_type] || []
    paymentBeneficiary.value[payment.beneficiary_entity_type].push(payment)
  })

  const currentSelection = ref(null)
</script>

<template>
  <form>
    <div class="control">
      <label for="type">Payment Type</label>
      <div class="select">
        <select
          v-model="currentSelection"
          id="type"
        >
          <option
            v-for="(payment, key, index) of paymentBeneficiary"
            :value="payment"
            :key="index"
          >
            {{ key }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="currentSelection">
      <PaymentForm
        :currentSelection="currentSelection"
      />
    </div>
  </form>
</template>

<style lang="scss">
@import '../node_modules/bulma/sass/utilities/_all.sass';
@import '../node_modules/bulma/sass/form/_all.sass';
@import '../node_modules/bulma/sass/elements/button.sass';

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f5fffc;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>