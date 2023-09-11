<template>
  <el-container style="height: 100vh;">
    <el-aside id="Collapse" :width="`${isCollapse ? '64px' : '200px'}`" style="overflow: hidden;"
      v-if="!appInfoStore().data.isMobile || isCollapse == false">
      <Aside :isCollapse="isCollapse" :menuData="menuStore().getMenu"></Aside>
    </el-aside>

    <el-container>
      <el-header height="50px" style="padding: 0;">
        <Header @changeCollapse="changeCollapse"></Header>
      </el-header>
      <el-main style="padding: 0; overflow: hidden;">
        <Tabs v-if="settingStore().setting.tabs" />
        <div class="w-full bg-[var(--el-bg-color-page)] overflow-auto" style="height: 100%;">
          <slot></slot>
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from "./components/Heard.vue"
import Aside from "./components/Aside.vue"
import Tabs from "../components/Tabs.vue"
import { menuStore, settingStore, appInfoStore } from '@/stores/index'


//菜单折叠
const isCollapse = ref(false)
const changeCollapse = (e: boolean) => {
  isCollapse.value = e
}

</script>

<style scoped></style>