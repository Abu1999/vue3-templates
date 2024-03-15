<template>
  <div class="w-full h-full " :style="{ backgroundColor: backgroundColor }">

    <div class="flex justify-center items-center cursor-pointer select-none h-[50px]" @click="myClick">
      <div style="width: 64px;" class="flex justify-center items-center">
        <el-image style="width: 40px; height: 40px" :src="url" fit="cover" />
      </div>
      <div class="font-bold text-[#fff]" v-if="!props.isCollapse">vue3+vite+ts</div>
    </div>
    <!-- text-color="--el-tree-text-color" -->
    <el-menu id="menu" :style="{ border: 0, '--menubackgroundColor': menubackgroundColor }"
      :background-color="backgroundColor" text-color="#fff" :collapse="props.isCollapse" :collapse-transition="false"
      :active="$route.path" :default-active="$route.path" :default-openeds="props.openeds">
      <template v-for="( item, index ) in  props.menuData " :key="index">
        <el-sub-menu background-color="red" v-if="item.children" :index="item.path ? item.path : item.title">
          <template #title>
            <template v-if="item.icon">
              <el-icon>
                <component :is="item.icon" v-if="item.icon.indexOf('/') == -1"></component>
                <el-image style="width: 18px; height: 18px;" :src="item.icon" fit="cover" v-else />
              </el-icon>
            </template>
            <span class="select-none">{{ item.title }}</span>
          </template>

          <template v-for="( list, listIndex ) in  item?.children " :key="listIndex">
            <el-sub-menu :index="list.path ? list.path : list.title" v-if="list.children">
              <template v-if="list.icon">
                <el-icon>
                  <component :is="list.icon" v-if="list.icon.indexOf('/') == -1"></component>
                  <el-image style="width: 18px; height: 18px;" :src="list.icon" fit="cover" v-else />
                </el-icon>
              </template>
              <template #title>
                <span class="select-none">{{ list.title }}</span>
              </template>

              <template v-for="( listItem, listItemIndex ) in  list.children " :key="listItemIndex">
                <el-menu-item :index="listItem.path ? listItem.path : listItem.title"
                  @click="listItem.path ? $router.push(listItem.path) : ''">
                  <template v-if="listItem.icon">
                    <el-icon>
                      <component :is="listItem.icon" v-if="listItem.icon.indexOf('/') == -1"></component>
                      <el-image style="width: 18px; height: 18px;" :src="listItem.icon" fit="cover" v-else />
                    </el-icon>
                  </template>
                  <template #title>
                    <span class="select-none">{{ listItem.title }}</span>
                  </template>
                </el-menu-item>
              </template>


            </el-sub-menu>

            <el-menu-item v-else :index="list.path ? list.path : item.title"
              @click="list.path ? $router.push(list.path) : ''">
              <template v-if="list.icon">
                <el-icon>
                  <component :is="list.icon" v-if="list.icon.indexOf('/') == -1"></component>
                  <el-image style="width: 18px; height: 18px;" :src="list.icon" fit="cover" v-else />
                </el-icon>
              </template>
              <template #title>
                <span class="select-none">{{ list.title }}</span>
              </template>
            </el-menu-item>
          </template>

        </el-sub-menu>

        <el-menu-item v-else :index="item.path ? item.path : item.title"
          @click="item.path ? $router.push(item.path) : ''">
          <template v-if="item.icon">
            <el-icon>
              <component :is="item.icon" v-if="item.icon.indexOf('/') == -1"></component>
              <el-image style="width: 18px; height: 18px;" :src="item.icon" fit="cover" v-else />
            </el-icon>
          </template>
          <template #title>
            <span class="select-none">{{ item.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="tsx">
import router from '@/router';
import { ref } from 'vue'

interface MenuData {
  title: string
  icon?: string
  path?: string
  children?: MenuData[]
}

interface Props {
  isCollapse: boolean
  menuData: MenuData[]
  openeds?: any
}
const props = defineProps<Props>()

const url = 'https://fanmingming.com/bing'

const myClick = () => {
  router.push('/')
}

// let backgroundColor = ref('var(--el-bg-color)')
// let menubackgroundColor = ref('var(--el-bg-color)')

let backgroundColor = ref('#001529')
let menubackgroundColor = ref('#0f2438')

</script>

<style lang="scss" scoped>
// :deep(#menu li ul) {
//   background-color: var(--menubackgroundColor) !important;
// }

// :deep(#menu li ul .el-sub-menu__title) {
//   background-color: var(--menubackgroundColor) !important;

//   // :hover {
//   //   background-color: var(--el-color-primary-light-7) !important;
//   // }
// }

// //   --el-color-primary: #409EFF;
// :deep(.el-menu-item.is-active) {
//   background-color: var(--el-color-primary-light-7);
//   color: --el-color-primary;
// }

// //   --el-color-primary: #409EFF;
// :deep(.el-menu) {
//   // --el-menu-hover-bg-color: var(--el-color-primary-light-9) !important;
//   --el-menu-hover-bg-color: var(--el-color-primary-light-9) !important;
// }

:deep(#menu li ul) {
  background-color: var(--menubackgroundColor) !important;
}

:deep(#menu li ul .el-sub-menu__title) {
  background-color: var(--menubackgroundColor) !important;
}

//   --el-color-primary: #409EFF;
:deep(.el-menu-item.is-active) {
  background-color: var(--el-color-primary);
  color: #fff;
}
</style>