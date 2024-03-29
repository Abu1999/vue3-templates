<template>
  <!-- 表格 -->
  <div class="w-full h-full relative">
    <div class="w-full h-full absolute flex flex-col justify-between">
      <div class="w-full h-[calc(100%-52px)]">
        <el-table v-loading="props.loading" :data="props.data" :height="props.height" :width="props.width"
          :size="props.tablesize" :border="props.border" :stripe="props.stripe" @selectionChange="selectionChange"
          :header-cell-style="{ backgroundColor: 'var(--el-border-color-lighter)' }" show-overflow-tooltip>
          <template v-for="(item, index) in props.columns" :key="index">
            <!-- 勾选框 -->
            <el-table-column v-if="item.type == 'selection'" :prop="item.prop" :label="item.label" :align="item.align"
              type="selection" :width="item.width ?? '55'" :fixed="item.fixed" />
            <el-table-column v-else-if="item.type == 'slot'" :label="item.label" :align="item.align" :width="item.width"
              :min-width="item.minWidth" :fixed="item.fixed">
              <template #default="{ row, column, $index }">
                <slot :name="item.prop" :row="row" :column="column" :index="$index"></slot>
              </template>
            </el-table-column>
            <el-table-column v-else :prop="item.prop" :label="item.label" :align="item.align" :width="item.width"
              :min-width="item.minWidth" :fixed="item.fixed" />
          </template>
          <template #empty>
            <el-empty class="select-none" :image-size="props.imagesize ? props.imagesize : 200" description="暂无数据" />
          </template>
        </el-table>
      </div>

      <div class="w-full h-auto">
        <!-- 分页 -->
        <template v-if="props.pagination">
          <div class="w-full flex justify-end" v-if="appInfoStore()?.data?.isMobile">
            <el-pagination @size-change="sizeChange" @current-change="currentChange" background small
              :default-page-size="props.pagination.pageSize" :current-page="props.pagination.currentPage"
              layout="prev, pager, next" :total="Number(props.pagination.total)" />
          </div>
          <div class="w-full flex justify-end" v-else>
            <el-pagination @size-change="sizeChange" @current-change="currentChange" background
              :default-page-size="props.pagination.pageSize" :current-page="props.pagination.currentPage"
              layout="total, sizes, prev, pager, next, jumper" :total="Number(props.pagination.total)" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { appInfoStore } from '@/stores/index'

defineOptions({
  name: 'MyTable'
})
interface TableColums {
  type?: string // selection
  align?: string //位置  center || left || right
  prop?: string // 字段
  label?: string // 名称
  width?: string // 列宽度
  fixed?: string | boolean // 固定列
  minWidth?: string //最小宽度
}
interface Props {
  data?: { [key: string]: any }[]
  columns: TableColums[]
  pagination?: { pageSize: number; currentPage: number; total: number } | false
  loading: boolean
  border?: boolean // 表格线
  stripe?: boolean // 斑马条
  height?: string | number // 高
  width?: string | number // 宽
  imagesize?: number // 空状态图片宽度
  tablesize?: any // large / default /small
}

let props = withDefaults(defineProps<Props>(), {
  data: () => [],
  pagination: false,
  border: false,
  stripe: false,
  height: '100%', // 高
  width: '100%',
  tablesize: 'default'
})

const emit = defineEmits<{
  (e: 'paginationChange', pagination: any): void
  (e: 'selectionChange', value: any): void
}>()

const selectionChange = (e: any) => {
  console.log(1)

  emit('selectionChange', e)
}

// 改变了父组件的对象值，eslint不允许，数据单项传递。所以忽略了。

// 页面数据限制改变
const sizeChange = (e: number) => {
  console.log(2)
  // eslint-disable-next-line
  if (props.pagination) props.pagination.pageSize = e
  sessionStorage.setItem('MyTable', JSON.stringify(props.pagination))
  emit('paginationChange', props.pagination)
}

// 当前页改变
const currentChange = (e: number) => {
  console.log(3)
  // eslint-disable-next-line
  if (props.pagination) props.pagination.currentPage = e
  sessionStorage.setItem('MyTable', JSON.stringify(props.pagination))
  emit('paginationChange', props.pagination)
}
</script>

<style scoped></style>
