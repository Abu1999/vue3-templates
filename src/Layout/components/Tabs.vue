<template>
  <div class="w-full h-auto">
    <el-tabs
      class="w-full"
      id="tabs"
      style="height: 40px"
      size="small"
      v-model="$route.fullPath"
      type="card"
      @tab-remove="removeTab"
      @tab-change="changTab"
    >
      <el-tab-pane
        :closable="item.name === '/' ? false : true"
        v-for="(item, index) in tabsStore().data"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <template #label>
          <div
            class="w-full h-full select-none flex justify-center items-center"
            @contextmenu="(e: any) => { openContextMenu(e, index) }"
          >
            {{ item.title }}
          </div>

          <context-menu :name="`context-menu-${index}`">
            <context-menu-item @click="refresh" :divider="false">
              <div class="flex items-center space-x-2">
                <el-icon>
                  <RefreshRight />
                </el-icon>
                <div class="select-none">重新加载</div>
              </div>
            </context-menu-item>
            <context-menu-item
              v-for="(list, listIndex) in contextMenuList"
              :key="listIndex"
              :disabled="disable(list, index)"
              @click="disable(list, index) ? '' : removeTab(item.name, list.method)"
              :divider="list.divider"
            >
              <div class="flex items-center space-x-2">
                <el-icon>
                  <component :is="list.icon"></component>
                </el-icon>
                <div class="select-none">{{ list.title }}</div>
              </div>
            </context-menu-item>
          </context-menu>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>

  <!-- <div style="margin-bottom: 20px">
    <el-button size="small" @click="addTab(editableTabsValue)">
      add tab
    </el-button>
  </div> -->
</template>

<script setup lang="ts">
import { tabsStore } from '@/stores'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()

const removeTab = (targetName: any, method?: string) => {
  tabsStore().remove(targetName, method)
}
const changTab = (targetName: any) => {
  router.push(targetName)
}

// 标签页反键
const contextMenuList = [
  { icon: 'Close', title: '关闭标签页', method: '', divider: true },
  { icon: 'DArrowLeft', title: '关闭左侧标签页', method: 'left', divider: false },
  { icon: 'DArrowRight', title: '关闭右侧标签页', method: 'right', divider: true },
  { icon: 'SemiSelect', title: '关闭其他标签页', method: 'self', divider: false },
  { icon: 'Delete', title: '关闭全部标签页', method: 'all', divider: false }
]

const emitContext = inject('emitContext') as (event: Event, dataId: Record<string, unknown>) => void

const refresh = () => {
  router.go(0)
}

const openContextMenu = (e: any, index: number) => {
  emitContext(e, { name: `context-menu-${index}` })
}

// 判断标签disable
const disable = (list: any, index: number) => {
  return (
    (index == 0 && list.method != 'all') ||
    (index == 1 && list.method == 'left') ||
    (index == tabsStore().data.length - 1 && list.method == 'right')
  )
}
</script>

<style scoped>
:deep(#tabs .el-tabs__item) {
  padding-left: 0;
  padding-right: 0;
  padding: 0px 15px;
  width: auto;
  height: 30px;
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  margin-left: 5px;
}

:deep(#tabs .el-tabs__header) {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  z-index: 0 !important;
}

:deep(#tabs .el-tabs__nav) {
  border: 0;
}

:deep(#tabs .el-tabs__nav-wrap.is-scrollable) {
  padding: 16px 40px;
}

:deep(#tabs .el-tabs__nav-prev) {
  width: 40px;
  line-height: 32px;
}

:deep(#tabs .el-tabs__nav-next) {
  line-height: 32px;
  width: 40px;
}
</style>
