<template>
  <div class="w-full h-full">
    <div class="h-full flex items-center space-x-2 border-b">
      <!-- <el-color-picker v-model="color1" @change="(e) => { store.changeThemeColor(e || color1) }" /> -->
      <div class="h-full flex  items-center cursor-pointer select-none px-3" @click="CollapseMenu">
        <el-icon size="18">
          <Fold v-if="true" />
          <Expand size="18" v-else />
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/test">测试页</a></el-breadcrumb-item>
      </el-breadcrumb>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { layoutStore } from '@/stores/index'
let isCollapse = ref(true)
let Menu = ref(true)

const emit = defineEmits<{
  (event: 'changeMenu', value: boolean): void
}>()


const CollapseMenu = () => {
  isCollapse.value = !isCollapse.value
  emit('changeMenu', isCollapse.value)
}


</script>

<style scoped></style>