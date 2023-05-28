<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <input
    type="text"
    :name="name"
    class="border p-4"
    :placeholder="name.replace(/_/g, ' ')"
  />
</template>