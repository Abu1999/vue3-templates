<template>
  <Index class="w-full h-full" v-slot="{ state }">
    <div>
      <div>222222222222222</div>
    </div>
    <div>{{ state.num + 111111 }}</div>
  </Index>
</template>

<script setup lang="ts">
import Index from './index'
import { onMounted, ref } from 'vue';

const text: any = ref(null)

onMounted(() => {
})

</script>

<style scoped></style>