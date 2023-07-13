<template>
  <div class="w-full h-full">
    <div class="h-full flex items-center space-x-2 border-b">
      <div class="h-full flex  items-center cursor-pointer select-none px-3" @click="changeCollapse">
        <el-icon size="18">
          <Fold v-if="!isCollapse" />
          <Expand size="18" v-else />
        </el-icon>
      </div>
      <el-breadcrumb separator="/" v-if="arr.length">
        <el-breadcrumb-item v-for="(item, index) in arr" :key="index" :to="{ path: item.path ? item.path : '#' }">{{
          item.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { menuStore } from '@/stores';

const route = useRoute()
const menuData = menuStore().data
let data: any = ref({})

// 折叠
let isCollapse = ref(false)
const emit = defineEmits<{
  (event: 'changeCollapse', value: boolean): void
}>()
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
  emit('changeCollapse', isCollapse.value)
}

let arr: any = ref([]);
const find = (data: any) => {
  let obj: any;
  data.forEach((item: any) => {
    if (obj) return
    // 如果路由name与菜单对应可打开
    // if (item.path === route.path && item.title === route.name) {
    //   obj = item
    // }
    if (item.path === route.path) {
      obj = item
    }
    if (item.children && item.children.length && !obj) {
      if (find(item.children)) obj = item
    }

    if (obj) {
      arr.value.unshift({ path: item.path, title: item.title })
      return
    }
  })
  return obj
}

watch(() => route.path, () => {
  arr.value = []
  find(menuData)
}, { deep: true })


</script>

<style scoped></style>