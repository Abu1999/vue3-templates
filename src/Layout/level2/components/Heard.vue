<template>
  <div
    class="w-full h-full flex justify-between border-b"
    style="border-color: var(--el-border-color-light)"
  >
    <div class="w-full h-full flex items-center">
      <div
        class="flex justify-center items-center cursor-pointer select-none h-[50px] w-auto"
        @click="myClick"
      >
        <div class="ml-3 flex justify-center items-center">
          <el-image style="width: 40px; height: 40px" :src="url" fit="cover" />
        </div>
        <div class="font-bold whitespace-nowrap ml-3" v-if="!isCollapse">vue3+vite+ts</div>
      </div>

      <div class="w-10/12 ml-2">
        <el-menu
          id="menu"
          style="height: 50px"
          :collapse-transition="false"
          mode="horizontal"
          :active="$route.path"
          :default-active="$route.path"
          :menu-trigger="appInfoStore().data.isMobile ? 'click' : 'hover'"
          popper-effect="light"
        >
          <template v-for="(item, index) in props.menuData" :key="index">
            <el-sub-menu
              background-color="red"
              v-if="item.children"
              :index="item.path ? item.path : item.title"
            >
              <template #title>
                <template v-if="item.icon">
                  <el-icon>
                    <component :is="item.icon" v-if="item.icon.indexOf('/') == -1"></component>
                    <el-image
                      style="width: 18px; height: 18px"
                      :src="item.icon"
                      fit="cover"
                      v-else
                    />
                  </el-icon>
                </template>
                <span class="select-none">{{ item.title }}</span>
              </template>

              <template v-for="(list, listIndex) in item?.children" :key="listIndex">
                <el-sub-menu :index="list.path ? list.path : list.title" v-if="list.children">
                  <template v-if="list.icon">
                    <el-icon>
                      <component :is="list.icon" v-if="list.icon.indexOf('/') == -1"></component>
                      <el-image
                        style="width: 18px; height: 18px"
                        :src="list.icon"
                        fit="cover"
                        v-else
                      />
                    </el-icon>
                  </template>
                  <template #title>
                    <span class="select-none">{{ list.title }}</span>
                  </template>

                  <template v-for="(listItem, listItemIndex) in list.children" :key="listItemIndex">
                    <el-menu-item
                      :index="listItem.path ? listItem.path : listItem.title"
                      @click="listItem.path ? $router.push(listItem.path) : ''"
                    >
                      <template v-if="listItem.icon">
                        <el-icon>
                          <component
                            :is="listItem.icon"
                            v-if="listItem.icon.indexOf('/') == -1"
                          ></component>
                          <el-image
                            style="width: 18px; height: 18px"
                            :src="listItem.icon"
                            fit="cover"
                            v-else
                          />
                        </el-icon>
                      </template>
                      <template #title>
                        <span class="select-none">{{ listItem.title }}</span>
                      </template>
                    </el-menu-item>
                  </template>
                </el-sub-menu>

                <el-menu-item
                  v-else
                  :index="list.path ? list.path : item.title"
                  @click="list.path ? $router.push(list.path) : ''"
                >
                  <template v-if="list.icon">
                    <el-icon>
                      <component :is="list.icon" v-if="list.icon.indexOf('/') == -1"></component>
                      <el-image
                        style="width: 18px; height: 18px"
                        :src="list.icon"
                        fit="cover"
                        v-else
                      />
                    </el-icon>
                  </template>
                  <template #title>
                    <span class="select-none">{{ list.title }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-sub-menu>

            <el-menu-item
              v-else
              :index="item.path ? item.path : item.title"
              @click="item.path ? $router.push(item.path) : ''"
            >
              <template v-if="item.icon">
                <el-icon>
                  <component :is="item.icon" v-if="item.icon.indexOf('/') == -1"></component>
                  <el-image style="width: 18px; height: 18px" :src="item.icon" fit="cover" v-else />
                </el-icon>
              </template>
              <template #title>
                <span class="select-none">{{ item.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
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
            <!-- <el-dropdown-item>Action 1</el-dropdown-item> -->
            <el-dropdown-item @click="tomine">个人中心</el-dropdown-item>
            <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
            <!-- <el-dropdown-item divided @click="quit">退出登录</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { tabsStore, appInfoStore, menuStore } from '@/stores/index'
import router from '@/router/index'
import { ElMessage } from 'element-plus'

interface MenuData {
  title: string
  icon?: string
  path?: string
  children?: MenuData[]
}

interface Props {
  menuData: MenuData[]
}
const props = defineProps<Props>()

const url = 'https://fanmingming.com/bing'

const myClick = () => {
  router.push('/')
}

let isCollapse = ref(false)

const route = useRoute()
let visible = ref(false)
let screenWidth = ref(document.documentElement.clientWidth)

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
    find(props.menuData)
  },
  { deep: true, immediate: true }
)

const quit = () => {
  tabsStore().clear()
  menuStore().clear()
  localStorage.removeItem('token')
  sessionStorage.removeItem('tabs')
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
    if (screenWidth.value < 991) {
      isCollapse.value = true
    } else {
      isCollapse.value = false
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
