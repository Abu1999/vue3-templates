<!--
 * @Author: bbw 1526699702@qq.com
 * @Date: 2023-09-12 14:33:45
 * @LastEditors: bbw 1526699702@qq.com
 * @LastEditTime: 2024-01-10 09:25:54
 * @FilePath: \smart-web\src\Layout\level2\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container style="height: 100vh; min-width: 956px">
    <el-header height="50px" style="padding: 0">
      <Header :menuData="menuStore().getMenu"></Header>
    </el-header>
    <el-main style="padding: 0; overflow: auto">
      <Tabs v-if="settingStore().setting.tabs" />
      <div
        :style="{ height: settingStore().setting.tabs ? 'calc(100% - 40px)' : '100%' }"
        class="w-full bg-[var(--el-bg-color-page)]"
      >
        <slot></slot>
      </div>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script setup lang="ts">
import Header from './components/Heard.vue'
import Tabs from '../components/Tabs.vue'
import { menuStore, settingStore } from '@/stores/index'
</script>

<style scoped></style>
