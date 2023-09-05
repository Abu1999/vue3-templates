<template>
  <el-tree :data="data" highlight-current :default-expand-all="props.defaultExpandAll" :show-checkbox="props.showCheckbox"
    :icon="props.icon" node-key="id" :props="props.defaultProps" />
</template>

<script lang="tsx" setup>
import { ArrowRightBold } from '@element-plus/icons-vue';
import { type Component } from 'vue';

interface Props {
  defaultProps: { children: string; label: string; }
  showCheckbox: boolean
  defaultExpandAll: boolean
  icon: string | Component
}

const props = withDefaults(defineProps<Props>(), {
  defaultProps: () => ({
    children: 'children',
    label: 'label'
  }),
  icon: () => <el-icon><ArrowRightBold /></el-icon>,
  showCheckbox: false,
  defaultExpandAll: true
})

const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    // children: [
    //   {
    //     id: 7,
    //     label: 'Level two 3-1',
    //   },
    //   {
    //     id: 8,
    //     label: 'Level two 3-2',
    //   },
    // ],
  },
]
</script>