<!--
 * @Author: bbw 1526699702@qq.com
 * @Date: 2023-09-12 14:33:45
 * @LastEditors: bbw 1526699702@qq.com
 * @LastEditTime: 2024-01-10 09:50:14
 * @FilePath: \smart-web\src\Layout\level1\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container style="height: 100vh; min-width: 956px;">
    <el-aside id="Collapse" :width="`${isCollapse ? '65px' : '200px'}`" style="overflow: hidden; height: 100vh;"
      v-if="!appInfoStore().data.isMobile || isCollapse == false">
      <Aside class="overflow-auto" :isCollapse="isCollapse" :menuData="menuStore().getMenu" :openeds="menuConfig.openeds">
      </Aside>
    </el-aside>

    <el-container>
      <el-header height="50px" style="padding: 0;">
        <Header @changeCollapse="changeCollapse"></Header>
      </el-header>
      <el-main style="padding: 0; overflow: hidden;">
        <Tabs v-if="settingStore().setting.tabs" />
        <div :style="{ height: settingStore().setting.tabs ? 'calc(100% - 40px)' : '100%' }"
          class="w-full bg-[var(--el-bg-color-page)]">
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
import { menuConfig } from '@/appconfig'

//菜单折叠
const isCollapse = ref(false)
const changeCollapse = (e: boolean) => {
  isCollapse.value = e
}

</script>

<style scoped>
:deep(.el-aside) {
  border-right: 1px solid var(--el-border-color-light);
}
</style>