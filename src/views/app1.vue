<template>
  <div class="flex space-x-5">
    <div class="flex space-x-2">
      <el-button @click="changeDebounceFn">防抖</el-button>
      <div>{{ input1 }}</div>
    </div>
    <div class="flex space-x-2">
      <el-button @click="changeuseThrottleFn">节流</el-button>
      <div>{{ input2 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

const input1 = ref(1)
const input2 = ref(1)


const changeDebounceFn: any = useDebounceFn(() => {
  input1.value = input1.value ? 0 : 1
}, 1500)

const changeuseThrottleFn: any = useThrottleFn(() => {
  input2.value = input2.value ? 0 : 1
}, 1500)

</script>

<style scoped></style>