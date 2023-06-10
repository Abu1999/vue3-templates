<template>
  <el-container style="height: 100vh;">
    <el-aside id="Collapse" :width="`${isCollapse ? '64px' : '200px'}`" style="overflow: hidden;">
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>

    <el-container>
      <el-header style="padding: 0;">
        <Header @changeMenu="changeMenu"></Header>
      </el-header>
      <el-main>
        {{ isCollapse }}
        <slot></slot>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from "./components/heard.vue"
import Aside from "./components/aside.vue"


const isCollapse = ref(false)

const changeMenu = (e: boolean) => {
  isCollapse.value = e
}


</script>

<style scoped></style>