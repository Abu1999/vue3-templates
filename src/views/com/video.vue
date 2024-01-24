<!--
 * @Author: bbw 1526699702@qq.com
 * @Date: 2024-01-17 15:10:30
 * @LastEditors: bbw 1526699702@qq.com
 * @LastEditTime: 2024-01-24 15:42:49
 * @FilePath: \vue3-templates\src\views\com\video.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="w-full h-full p-5 flex">
    <div class="w-[10%]"></div>
    <div class="w-[80%] h-[100%]">
      <MyVideo :src="src" :key="key"></MyVideo>
    </div>
    <div class="w-[10%] h-full" @click="next"></div>
  </div>
</template>

<script setup lang="ts">
// import { MyVideo } from "@/components/page"
import { ref } from "vue";
import RequestHttp from '@/utils/axios';

let src = ref(undefined)
let key = ref(0)

const next = () => {
  const url = '/api/api/xjj.php'
  RequestHttp.get(url).then((res: any) => {
    src.value = res
    key.value++
  })
}

</script>

<style scoped></style>