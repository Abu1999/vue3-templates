<template>
  <div class="w-full h-full" :style="{ backgroundColor: backgroundColor, color: '#fff' }">

    <div class="flex justify-center items-center cursor-pointer select-none" style="height: 60px;" @click="myClick">
      <div style="width: 64px;" class="flex justify-center items-center">
        <el-image style="width: 40px; height: 40px" :src="url" fit="cover" />
      </div>
      <div class="font-bold" v-if="!props.isCollapse">element-puls</div>
    </div>

    <el-menu id="menu" :style="{ border: 0, '--menubackgroundColor': menubackgroundColor }"
      :background-color="backgroundColor" text-color="#fff" default-active="2" :collapse="props.isCollapse"
      :collapse-transition="false" :active="$route.path" active-text-color="red">
      <template v-for="( item, index ) in  props.menuData " :key="index">
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
}
const props = defineProps<Props>()

const url = 'https://tdesign.gtimg.com/demo/demo-image-1.png'

const myClick = () => {
  router.push('/')
}

let backgroundColor = ref('#001529')
let menubackgroundColor = ref('#0f2438')

</script>

<style lang="scss" scoped>
:deep(#menu li ul) {
  background-color: var(--menubackgroundColor) !important;
}

:deep(#menu li ul .el-sub-menu__title) {
  background-color: var(--menubackgroundColor) !important;
}
</style>