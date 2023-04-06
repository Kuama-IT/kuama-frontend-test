<script setup>
  import { computed, ref, watch } from "vue";

  const prop = defineProps({
    currentSelection: {
      type: Array,
      required: true
    }
  })

  const personFields = ref([
    'beneficiary_first_name',
    'beneficiary_last_name',
    'beneficiary_company_name'
  ]);

  const current = ref(prop.currentSelection[0]);

  watch(
    () => prop.currentSelection,
    () => current.value = prop.currentSelection[0]
  )

  const dataFields = computed(() => {
    const fields = {}
    personFields.value.forEach(field => {
      if(!current.value.fields[field]) {
        return
      }

      fields[field] = current.value.fields[field]
    })
    return fields
  })

  const filteredFields = computed(() => {
    const currentFields = Object.keys(current.value.fields);
    const fields = {};

    currentFields.filter((el) => !personFields.value.includes(el)).forEach(field => {
      fields[field] = current.value.fields[field]
    })

    return fields
  })

  function showElement(option) {
    current.value = option
  }
</script>

<template>
  <div v-if="current">
    <div
      v-for="(field, key, index) of dataFields"
      :key="index"
      class="field"
    >
    <div class="control">
      <input
        :name="key"
        :pattern="field"
        :placeholder="key"
        type="text"
        class="input"
        >
      </div>
    </div>
  </div>

  <nav>
    <button
      v-for="(option, index) of currentSelection"
      :key="index"
      @click.prevent="showElement(option)"
      :class="{'active': option.payment_type === current.payment_type}"
      class="button"
    >
      {{ option.payment_type }}
    </button>
  </nav>

  <div>
    <div v-if="current">
      <div
        v-for="(field, key, index) of filteredFields"
        :key="index"
        class="field"
      >
      <div class="control">
        <input
          :name="key"
          :pattern="field"
          :placeholder="key"
          type="text"
          class="input"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background: blue;
  color: white;
}
</style>