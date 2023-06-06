<template>
  <el-container style="height: 100vh;">
    <el-header style="padding: 0 10px;">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <slot></slot>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from "./components/heard.vue"

</script>

<style scoped></style>