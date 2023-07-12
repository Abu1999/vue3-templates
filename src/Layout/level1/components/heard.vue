<template>
  <div class="w-full h-full">
    <div class="h-full flex items-center space-x-2 border-b">
      <div class="h-full flex  items-center cursor-pointer select-none px-3" @click="changeCollapse">
        <el-icon size="18">
          <Fold v-if="!isCollapse" />
          <Expand size="18" v-else />
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path != '/'" :to="{ path: route.path }">{{ route.name }}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

// 折叠
let isCollapse = ref(false)
const emit = defineEmits<{
  (event: 'changeCollapse', value: boolean): void
}>()
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('changeCollapse', isCollapse.value)
}


</script>

<style scoped></style>