<template>
  <div class="w-full h-auto">
    <el-tabs @tab-click="click1" class="w-full" id="tabs" style="height: 40px;" size="small" v-model="editableTabsValue"
      type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name"></el-tab-pane>
    </el-tabs>
  </div>

  <!-- <div style="margin-bottom: 20px">
    <el-button size="small" @click="addTab(editableTabsValue)">
      add tab
    </el-button>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
  },
  {
    title: 'Tab 2',
    name: '2',
  },
])

const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}

const click1 = () => {
  console.log(1);
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
  border-radius: 0;
  margin-left: 5px;
}

:deep(#tabs .el-tabs__header) {
  display: flex;
  align-items: center;
  margin-bottom: 0;
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