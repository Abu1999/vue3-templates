<template>
  <el-container style="height: 100vh;  overflow: hidden;">
    <el-header height="50px" style="padding: 0;">
      <Header :menuData="menuStore().data"></Header>
    </el-header>
    <el-main style="padding: 0; overflow: hidden;">
      <Tabs v-if="settingStore().setting.tabs" />
      <div class="w-full bg-[var(--el-bg-color-page)] overflow-auto" style="height: 100%; ">
        <slot></slot>
      </div>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script setup lang="ts">
import Header from "./components/Heard.vue"
import Tabs from "../components/Tabs.vue"
import { menuStore, settingStore } from '@/stores/index'

</script>

<style scoped></style>