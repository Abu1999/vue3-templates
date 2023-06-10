<template>
  <div class="w-full h-full">
    <div class="h-full flex items-center space-x-2 border-b">
      <div class="h-full flex  items-center cursor-pointer select-none px-3" @click="CollapseMenu">
        <el-icon size="18">
          <Fold v-if="true" />
          <Expand size="18" v-else />
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path == '/test'"><a href="/test">测试页</a></el-breadcrumb-item>
      </el-breadcrumb>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let isCollapse = ref(false)

const emit = defineEmits<{
  (event: 'changeMenu', value: boolean): void
}>()


const CollapseMenu = () => {
  isCollapse.value = !isCollapse.value
  emit('changeMenu', isCollapse.value)
}


</script>

<style scoped></style>