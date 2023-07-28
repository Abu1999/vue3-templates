<template>
  <div ref="setting"
    class=" fixed top-[45%] right-0 w-[40px] h-[40px] text-center bg-[var(--el-color-primary)] cursor-pointer rounded-l-md flex justify-center items-center"
    @click="openDrawer" draggable="true" @dragstart="dragstart" @dragend="dragend">
    <el-icon size="20" style="color: #fff;">
      <Setting />
    </el-icon>
    <el-drawer :append-to-body="true" v-model="drawer" size="350px" :z-index="4000">
      <template #header>
        <span class="text-16px font-700 text-left">项目配置</span>
      </template>
      <Dark />

    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import Dark from './dark.vue'
import { ref } from 'vue'

let drawer = ref(false)
let setting = ref()

const openDrawer = (e: any) => {
  console.log(1111111111);
  drawer.value = true
}
// 拖拽开始事件
const dragstart = (e: any) => {
}
// 拖拽完成事件
const dragend = (e: any) => {
  setting.value.style = `transform :translateY(${e.layerY}px)`
}
</script>

<style scoped>
/* body {
    transform: translateX(1);
  } */
</style>
