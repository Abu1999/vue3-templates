<template>
  <div
    class="w-full h-full flex justify-between border-b"
    style="border-color: var(--el-border-color-light)"
  >
    <div class="h-full flex items-center space-x-2" v-if="arr.length">
      <div
        class="h-full flex items-center cursor-pointer select-none px-3"
        @click="changeCollapse(!isCollapse)"
      >
        <el-icon size="18">
          <Fold v-if="!isCollapse" />
          <Expand size="18" v-else />
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(item, index) in arr"
          :key="index"
          :to="{ path: item.path ? '#' : '#' }"
          >{{ item.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>

    <div
      id="user_info"
      class="h-full flex items-center space-x-2 cursor-pointer select-none"
      @click="visible = true"
    >
      <el-dropdown trigger="click" size="95">
        <div class="flex items-center space-x-2 px-5" style="height: 50px; min-width: 50px">
          <el-avatar :size="35" src="https://fanmingming.com/bing" />
          <el-icon size="12">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="tomine">个人中心</el-dropdown-item>
            <!-- <el-dropdown-item divided @click="quit">退出登录</el-dropdown-item> -->
            <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { appInfoStore, menuStore, tabsStore } from '@/stores'
import router from '@/router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const menuData = menuStore().getMenu
let visible = ref(false)
let screenWidth = ref(document.documentElement.clientWidth)

// 折叠
let isCollapse = ref(false)
const emit = defineEmits<{
  (event: 'changeCollapse', value: boolean): void
}>()
const changeCollapse = (show: boolean) => {
  isCollapse.value = show
  emit('changeCollapse', show)
}

// 判断当前路由
let arr: any = ref([])
const find = (data: any) => {
  let obj: any
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

    if (obj && obj.path !== route.path) {
      arr.value.unshift({ path: item.path, title: item.title })
      return
    }
  })

  // 如果没有找到，则将当前路由添加到数组中
  if (arr.value.length === 0) {
    arr.value.push({ path: route.path, title: route.name })
  }

  return obj
}

watch(
  () => route.path,
  () => {
    arr.value = []
    find(menuData)
  },
  { deep: true, immediate: true }
)

const quit = () => {
  tabsStore().clear()
  menuStore().clear()
  localStorage.removeItem('token')
  sessionStorage.clear()
  ElMessage.success('退出登录')
  router.push('/login')
}

const tomine = () => {
  router.push('/mine')
}

window.onresize = () => {
  screenWidth.value = document.documentElement.clientWidth
}

watch(
  () => screenWidth.value,
  () => {
    if (screenWidth.value < 1024) {
      changeCollapse(true)
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
#user_info:hover {
  background-color: var(--el-fill-color-dark);
}
</style>
