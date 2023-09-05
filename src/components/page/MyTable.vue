<template>
  <!-- 表格 -->
  <div class="w-full h-full">
    <el-table v-loading="props.loading" :data="props.data" :height="props.height" :width="props.width"
      :border="props.border" :stripe="props.stripe" @selectionChange="selectionChange"
      :header-cell-style="{ backgroundColor: 'var(--el-border-color-lighter)' }">
      <template v-for="( item, index ) in  props.columns " :key="index">
        <!-- 勾选框 -->
        <el-table-column v-if="item.type == 'selection'" :prop="item.prop" :label="item.label" :align="item.align"
          type="selection" :width="item.width ?? '55'" :fixed="item.fixed" />
        <el-table-column v-else-if="item.type == 'slot'" :label="item.label" :align="item.align" :width="item.width"
          :fixed="item.fixed">
          <template #default="{ scope, row }">
            <slot :name="item.prop" :row=row :scope="scope"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :label="item.label" :align="item.align" :width="item.width"
          :fixed="item.fixed" />
      </template>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
  </div>

  <!-- 分页 -->
  <template v-if="props.pagination">
    <div class="w-full flex justify-end my-6" v-if="appInfoStore().data.isMobile">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" background small :pager-count="4"
        :default-page-size="props.pagination.pageSize" :current-page="props.pagination.currentPage"
        layout="prev, pager, next" :total="props.pagination.total" />
    </div>
    <div class="w-full flex justify-end my-6" v-else>
      <el-pagination @size-change="sizeChange" @current-change="currentChange" background
        :default-page-size="props.pagination.pageSize" :current-page="props.pagination.currentPage"
        layout="total, sizes, prev, pager, next, jumper" :total="props.pagination.total" />
    </div>
  </template>
</template>


<script setup lang="tsx">
import { appInfoStore } from '@/stores/index'
interface TableColums {
  type?: string // selection 
  align?: string //位置  center || left || right
  prop?: string, // 字段
  label?: string // 名称
  width?: string // 列宽度
  fixed?: string | boolean  // 固定列
}
interface Props {
  data?: { [key: string]: any }[]
  columns: TableColums[]
  pagination?: { pageSize: number, currentPage: number, total: number } | false
  loading: boolean
  border?: boolean  // 表格线
  stripe?: boolean  // 斑马条
  height?: string | number  // 高
  width?: string | number  // 宽
}

let props = withDefaults(defineProps<Props>(), {
  data: () => ([]),
  pagination: false,
  border: false,
  stripe: false,
  height: '65vh',  // 高
  width: '100%'
})

const emit = defineEmits<{
  (e: 'paginationChange', pagination: any): void
  (e: 'selectionChange', value: any): void
}>()

const selectionChange = (e: any) => {
  emit('selectionChange', e)
}

// 改变了父组件的对象值，eslint不允许，数据单项传递。所以忽略了。

// 页面数据限制改变
const sizeChange = (e: number) => {
  // eslint-disable-next-line
  if (props.pagination) props.pagination.pageSize = e
  sessionStorage.setItem('MyTable', JSON.stringify(props.pagination))
  emit('paginationChange', props.pagination)
}

// 当前页改变
const currentChange = (e: number) => {
  // eslint-disable-next-line
  if (props.pagination) props.pagination.currentPage = e
  sessionStorage.setItem('MyTable', JSON.stringify(props.pagination))
  emit('paginationChange', props.pagination)
}

</script>

<style scoped></style>