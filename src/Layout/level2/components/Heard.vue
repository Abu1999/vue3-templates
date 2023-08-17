<template>
  <div class="w-full h-full flex justify-between border-b " style="border-color: var(--el-border-color-light);">
    <div class="w-full h-full flex items-center">
      <div class="flex justify-center items-center cursor-pointer select-none h-[50px] w-auto" @click="myClick">
        <div style="width: 64px;" class="flex justify-center items-center">
          <el-image style="width: 40px; height: 40px" :src="url" fit="cover" />
        </div>
        <div class="font-bold whitespace-nowrap" v-if="!isCollapse">element-puls</div>
      </div>

      <div class="w-[70%] ml-2">

        <el-menu id="menu" style="height: 50px;" :collapse-transition="false" mode="horizontal" :active="$route.path"
          :default-active="$route.path" :menu-trigger="isMobile() ? 'click' : 'hover'" popper-effect="light">
          <template v-for="( item, index ) in props.menuData " :key="index">
            <el-sub-menu background-color="red" v-if="item.children" :index="item.path ? item.path : item.title">
              <template #title>
                <el-icon v-if="item.icon">
                  <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.title }}</span>
              </template>

              <template v-for="( list, listIndex ) in  item.children " :key="listIndex">
                <el-sub-menu :index="list.path ? list.path : list.title" v-if="list.children">
                  <template #title>
                    <el-icon v-if="list.icon">
                      <component :is="list.icon"></component>
                    </el-icon>
                    {{ list.title }}
                  </template>

                  <template v-for="( listItem, listItemIndex ) in  list.children " :key="listItemIndex">
                    <el-menu-item :index="listItem.path ? listItem.path : listItem.title"
                      @click="listItem.path ? $router.push(listItem.path) : ''">
                      <template #title>
                        <el-icon v-if="listItem.icon">
                          <component :is="listItem.icon"></component>
                        </el-icon>
                        {{ listItem.title }}
                      </template>
                    </el-menu-item>
                  </template>


                </el-sub-menu>

                <el-menu-item v-else :index="list.path ? list.path : item.title"
                  @click="list.path ? $router.push(list.path) : ''">
                  <template #title>
                    <el-icon v-if="list.icon">
                      <component :is="list.icon"></component>
                    </el-icon>
                    {{ list.title }}
                  </template>
                </el-menu-item>
              </template>

            </el-sub-menu>

            <el-menu-item v-else :index="item.path ? item.path : item.title"
              @click="item.path ? $router.push(item.path) : ''">
              <el-icon v-if="item.icon">
                <component :is="item.icon"></component>
              </el-icon>
              <template #title>
                {{ item.title }}
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>

    </div>

    <div id="user_info" class="h-full flex items-center space-x-2 cursor-pointer select-none" @click="visible = true">
      <el-dropdown trigger="click" size="95">
        <div class="flex items-center space-x-2 px-5" style="height: 50px;min-width: 50px;">
          <el-avatar :size="35" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-icon size="12">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item divided @click="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { menuStore, tabsStore } from '@/stores/index';
import router from '@/router/index';
import { isMobile } from '@/utils/app';

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

const url = 'https://tdesign.gtimg.com/demo/demo-image-1.png'

const myClick = () => {
  router.push('/')
}

let isCollapse = ref(false)

const route = useRoute()
let visible = ref(false)
let screenWidth = ref(document.documentElement.clientWidth)


// 判断当前路由
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
  find(props.menuData)
}, { deep: true, immediate: true })

const quit = () => {
  localStorage.removeItem('token')
  tabsStore().clear()
  sessionStorage.removeItem('tabs')
  router.push('/login')
}


window.onresize = () => {
  screenWidth.value = document.documentElement.clientWidth
}

watch(() => screenWidth.value, () => {
  if (screenWidth.value < 1000) {
    isCollapse.value = true
  }
}, { deep: true, immediate: true })


</script>

<style scoped>
#user_info:hover {
  background-color: var(--el-fill-color-dark);
}
</style>