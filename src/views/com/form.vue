<template>
  <div class="w-full h-full p-5">
    <div class="w-full h-[60vh] p-5 overflow-auto border">
      <MyForm :formData="formData" :formConfig="formConfig" :inline="false" :footer="true"></MyForm>
    </div>
    <div class="mt-5">{{ formData }}</div>
  </div>
</template>

<script setup lang="ts">
// import { MyForm } from "@/components/page"
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  number: 0,
  checkbox: [1],
  colorPicker: '#000'
})

const formConfig = reactive([
  {
    type: 'input',
    prop: 'input',
    label: 'input',
    required: false
  },
  {
    type: 'select',
    prop: 'select',
    label: 'select',
    required: false,
    options: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 }
    ],
    multiple: true
  },
  {
    type: 'date',
    prop: 'date',
    label: 'date',
    required: false
  },
  {
    type: 'dates',
    prop: 'dates',
    label: 'dates',
    required: false
  },
  {
    type: 'datetime',
    prop: 'datetime',
    label: 'datetime',
    required: false
  },
  {
    type: 'datetimerange',
    prop: 'datetimerange',
    label: 'datetimerange',
    required: false
  },
  {
    type: 'month',
    prop: 'month',
    label: 'month',
    required: false
  },
  {
    type: 'monthrange',
    prop: 'monthrange',
    label: 'monthrange',
    required: false
  },
  {
    type: 'year',
    prop: 'year',
    label: 'year',
    required: false
  },
  {
    type: 'number',
    prop: 'number',
    label: 'number',
    required: false
  },
  {
    type: 'checkbox',
    prop: 'checkbox',
    label: 'checkbox',
    required: false,
    options: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 }
    ]
  },
  {
    type: 'checkboxButton',
    prop: 'checkboxButton',
    label: 'checkboxButton',
    required: false,
    options: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 }
    ]
  },
  {
    type: 'radio',
    prop: 'radio',
    label: 'radio',
    required: false,
    options: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 }
    ]
  },
  {
    type: 'radioButton',
    prop: 'radioButton',
    label: 'radioButton',
    required: false,
    options: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 }
    ]
  },
  {
    type: 'switch',
    prop: 'switch',
    label: 'switch',
    required: false
  },
  {
    type: 'colorPicker',
    prop: 'colorPicker',
    label: 'colorPicker',
    required: false
  }
])
</script>

<style scoped></style>
