<!--
 * @Author: bbw 1526699702@qq.com
 * @Date: 2023-09-12 14:33:45
 * @LastEditors: bbw 1526699702@qq.com
 * @LastEditTime: 2023-12-26 10:45:15
 * @FilePath: \smart-web\src\components\page\MyTree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="w-full h-full relative p-4">
    <div class="relative top-0">
      <el-input v-model="filterText" placeholder="输入关键字过滤" :suffix-icon="Search" />
    </div>
    <div class="mt-2 p-2 select-none  overflow-auto" :style="{ maxHeight: props.height }">
      <el-tree ref="treeRef" :data="props.data" highlight-current :default-expand-all="props.defaultExpandAll"
        :show-checkbox="props.showCheckbox" :icon="props.icon" :node-key="props.nodeKey" :props="props.defaultProps"
        :default-checked-keys="props?.config && props.config.defaultCheckedKeys" :filter-node-method="filterNode"
        @node-click="nodeClick" @check="check" :check-strictly="props?.config && props.config?.checkStrictly"
        :expand-on-click-node="false"
        :current-node-key="props?.config && props.config.currentNodeKey && props.config.currentNodeKey[props.nodeKey]">
        <template #default="{ node }">
          <div
            v-if="node.level == 1 && node.label.length > 9 || node.level == 2 && node.label.length > 8 || node.level == 3 && node.label.length > 7">
            <el-tooltip class="box-item" effect="dark" :content="node.label" placement="right">
              <div>{{ node.label.slice(0, 6) + '...' }}</div>
            </el-tooltip>
          </div>
          <div v-else>
            <div>{{ node.label }}</div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ArrowRightBold, Search } from '@element-plus/icons-vue';
import { type Component, ref, watch } from 'vue';

interface Config {
  defaultCheckedKeys?: any
  checkedKeys?: any
  checkStrictly?: boolean
  currentNodeKey?: any
}

interface Props {
  data: any
  defaultProps?: { children: string; label: string; }
  showCheckbox?: boolean    //选择框
  defaultExpandAll?: boolean
  icon?: string | Component
  nodeKey?: string
  config?: Config
  height?: string // 最大高度
}
const props = withDefaults(defineProps<Props>(), {
  defaultProps: () => ({
    children: 'children',
    label: 'label',
  }),
  icon: () => <el-icon><ArrowRightBold /></el-icon>,
  showCheckbox: false,
  nodeKey: 'id',
  defaultExpandAll: true,
  height: '40vh',
})

const emit = defineEmits<{
  (e: 'nodeClick', value: any): void
}>()

const filterText = ref('')
const treeRef = ref()

// 节点点击
const nodeClick = (e: any) => {
  emit('nodeClick', e)
}
// 复选框
const check = () => {
  // eslint-disable-next-line
  let arr: string[] = []
  treeRef.value!.getCheckedNodes(false, true).forEach((el: any) => {
    console.log(el);
    arr.push(el[props.nodeKey])
  });
  // eslint-disable-next-line
  props.config && props.config.checkedKeys && (props.config.checkedKeys = arr)
}

// 过滤
const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data[props.defaultProps.label].includes(value)
}

const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false)
}


watch(filterText, (val) => {
  treeRef.value!.filter(val)
}, { deep: true })

// 通过ref传递方法,父组件触发
defineExpose({ resetChecked })

</script>