<!-- eslint-disable -->
<template>
  <el-input v-model="filterText" placeholder="输入关键字过滤" :suffix-icon="Search" />
  <div class="mt-2 p-2 select-none">
    <el-tree ref="treeRef" :data="props.data" highlight-current :default-expand-all="props.defaultExpandAll"
      :show-checkbox="props.showCheckbox" :icon="props.icon" node-key="id" :props="props.defaultProps"
      :default-checked-keys="props.config?.checkedKeys" :filter-node-method="filterNode" @node-click="nodeClick"
      @check="check" :check-strictly="props.config?.checkStrictly" :expand-on-click-node="false" />
  </div>
</template>

<script lang="tsx" setup>
import { ArrowRightBold, Search } from '@element-plus/icons-vue';
import { type Component, ref, watch } from 'vue';

interface Props {
  data: any
  defaultProps?: { children: string; label: string; }
  showCheckbox?: boolean
  defaultExpandAll?: boolean
  icon?: string | Component
  config?: {
    checkedKeys?: any
    checkStrictly?: boolean
  }
}

const emit = defineEmits<{
  (e: 'nodeClick', value: any): void
}>()

const filterText = ref('')
const treeRef = ref()
const props = withDefaults(defineProps<Props>(), {
  defaultProps: () => ({
    children: 'children',
    label: 'label'
  }),
  icon: () => <el-icon><ArrowRightBold /></el-icon>,
  showCheckbox: false,
  defaultExpandAll: true
})

// 节点点击
const nodeClick = (e: any) => {
  emit('nodeClick', e)
}
// 复选框
const check = () => {
  treeRef.value!.getCheckedNodes()
  // eslint-disable-next-line
  if (props.config) props.config.checkedKeys = treeRef.value!.getCheckedKeys()
}

// 过滤
const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.label.includes(value)
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