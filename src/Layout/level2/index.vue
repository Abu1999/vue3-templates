<template>
  <el-container style="height: 100vh;">
    <el-header height="50px" style="padding: 0;">
      <Header></Header>
    </el-header>
    <el-main style="padding: 0;">
      <Tabs />
      <div class="w-full p-5 bg-[var(--el-bg-color-page)]" style="height: calc(100% - 40px); ">
        <slot></slot>
      </div>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from "./components/Heard.vue"
import Tabs from "../components/Tabs.vue"



</script>

<style scoped></style>