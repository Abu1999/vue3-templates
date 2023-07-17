<template>
  <div class="w-full h-auto">
    <el-tabs class="w-full" id="tabs" style="height: 40px;" size="small" v-model="$route.path" type="card"
      @tab-remove="removeTab" @tab-change="changTab">
      <el-tab-pane :closable="item.name === '/' ? false : true" v-for="item in tabsStore().data" :key="item.name"
        :label="item.title" :name="item.name"></el-tab-pane>
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
import { useRouter } from 'vue-router';

const router = useRouter()

const removeTab = (targetName: any) => {
  tabsStore().remove(targetName)
}
const changTab = (targetName: any) => {
  router.push(targetName)
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