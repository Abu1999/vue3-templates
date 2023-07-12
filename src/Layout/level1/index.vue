<template>
  <el-container style="height: 100vh;">
    <el-aside id="Collapse" :width="`${isCollapse ? '64px' : '200px'}`" style="overflow: hidden;">
      <Aside :isCollapse="isCollapse" :menuData="menuStore().data"></Aside>
    </el-aside>

    <el-container>
      <el-header style="padding: 0;">
        <Header @changeCollapse="changeCollapse"></Header>
      </el-header>
      <el-main style="padding: 0;">
        <Tabs />
        <div class="w-full p-5" style="height: calc(100% - 40px); background-color: #F5F7F9;">
          <slot></slot>
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>

 
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from "./components/heard.vue"
import Aside from "./components/aside.vue"
import Tabs from "./components/Tabs.vue"
import { menuStore } from '@/stores/index'


//菜单折叠
const isCollapse = ref(false)
const changeCollapse = (e: boolean) => {
  isCollapse.value = e
}

</script>

<style scoped></style>