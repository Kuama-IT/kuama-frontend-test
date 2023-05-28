<script setup>
import { onMounted, ref, watch } from "vue";
import AppSelect from "./components/AppSelect.vue";
import AppInputText from "./components/AppInputText.vue";
import axios from "axios";

const dataJSON = ref(null);
const beneficiary_entity_type = ref("");

const activeTab = ref("");

const fieldsInEvidenzaMap = [
  "beneficiary_last_name",
  "beneficiary_first_name",
  "beneficiary_company_name",
];

const fieldsInEvidenzaActived = ref([]);

function parseFields(fields, isEvidenza) {
  let result = {};

  Object.keys(fields).forEach((fieldkey) => {
    if (isEvidenza && fieldsInEvidenzaMap.includes(fieldkey)) {
      result[fieldkey] = fields[fieldkey];
    }

    if (!isEvidenza && !fieldsInEvidenzaMap.includes(fieldkey)) {
      result[fieldkey] = fields[fieldkey];
    }
  });

  return result;
}

const tabs = ref(null);
watch(beneficiary_entity_type, (newValue, oldValue) => {
  tabs.value = [
    ...new Set(
      dataJSON.value.details.map((item) =>
        item.beneficiary_entity_type === newValue
          ? {
              payment: item.payment_type,
              fields: parseFields(item.fields),
              fieldsInEvidenza: parseFields(item.fields, true),
            }
          : null
      )
    ),
  ].filter((item) => item);

  fieldsInEvidenzaActived.value = tabs.value[0].fieldsInEvidenza;

  activeTab.value = tabs.value[0].payment;
});

const beneficiaries = ref([]);
onMounted(async () => {
  let response = await axios.get("data.json");
  dataJSON.value = response.data;

  beneficiaries.value = [
    ...new Set(
      dataJSON.value.details.map((item) => item.beneficiary_entity_type)
    ),
  ];
});
</script>

<template>
  <div class="p-8 flex flex-col w-[80%] m-auto">
    <h1 class="inline-block mb-8 text-primary font-bold text-xl text-center">
      Add beneficiary
    </h1>

    <div class="flex flex-col w-[300px] m-auto">
      <app-select
        placeholder="type"
        v-model:value="beneficiary_entity_type"
        name="beneficiary_entity_type"
        :options="beneficiaries"
      ></app-select>

      <div class="mt-4 w-full">
        <app-input-text
          class="mt-3 w-full"
          v-for="(field, fieldIndex) in fieldsInEvidenzaActived"
          :key="fieldIndex"
          :name="fieldIndex"
        />
      </div>

      <div class="mt-4 flex">
        <div class="flex m-2 flex-col" v-for="tab in tabs">
          <h2
            class="font-bold p-2 border-b cursor-pointer hover:text-primary inline-block"
            :class="[
              activeTab === tab.payment
                ? 'border-b-primary text-primary'
                : 'border-b-white',
            ]"
            @click.prevent="activeTab = tab.payment"
          >
            {{ tab.payment }}
          </h2>
          <div class="mt-2 flex flex-col" v-if="activeTab === tab.payment">
            <app-input-text
              class="mt-3"
              v-for="(field, fieldIndex) in tab.fields"
              :key="fieldIndex"
              :name="fieldIndex"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
