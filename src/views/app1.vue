<template>
  <div>
    <WujieVue width="100%" height="100%" name="vue3" :sync="sync"></WujieVue>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { useRouter, useRoute, } from 'vue-router'
import wujieVue from "wujie-vue3";

const sync = ref(true);

const route = useRoute()

watch(() => route.params.path, () => {
  console.log(1111, '>>>>');
  wujieVue.bus.$emit("vue3-router-change", `/${route.params.path}`);

}, { deep: true, immediate: true, })


</script>

<style scoped></style>