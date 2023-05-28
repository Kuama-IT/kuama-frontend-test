<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emits = defineEmits(["update:value"]);

const selectValue = computed({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});
</script>

<template>
  <select
    :name="name"
    v-model="selectValue"
    class="border p-4 rounded-md"
    :placeholder="placeholder"
  >
    <option
      v-for="option in options"
      :key="option"
      :name="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>