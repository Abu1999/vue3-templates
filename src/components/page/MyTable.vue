<template>
  <!-- 查询 -->
  <el-card class="mb-3">
    <div class="w-full flex ">
      <el-form :inline="true" :model="state.query" class="flex items-center flex-wrap space-y-2">
        <el-form-item v-model="state.query.user" label="Approved by"
          style="margin-bottom: 0px !important;--tw-space-y-reverse: 0;
            margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));">
          <el-input placeholder="Approved by" clearable />
        </el-form-item>
        <el-form-item v-model="state.query.region" label="Activity zone" style="margin-bottom: 0px !important;">
          <el-select class="w-1/3" placeholder="Activity zone" clearable>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item v-model="state.query.date" label="Activity time" style="margin-bottom: 0px !important;">
          <el-date-picker class="w-1/3" type="date" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item style="margin-bottom: 0px !important;">
          <el-button type="primary" @click="querySubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

  <!-- 表格 -->
  <el-card>
    <div class="w-full h-auto">
      <el-table v-loading="props.loading" :data="props.data" height="60vh" style="width: 100% ;" :border="props.border"
        :stripe="props.stripe" @selectionChange="selectionChange"
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
      </el-table>
    </div>

    <!-- 分页 -->
    <template v-if="props.pagination">
      <div class="w-full flex justify-end my-6" v-if="appInfoStore().data.isMobile">
        <el-pagination @size-change="sizeChange" @current-change="currentChange" background small :pager-count="4"
          :default-page-size="props.pagination.pageSize" :current-page="props.pagination.currentPage"
          layout="prev, pager, next, jumper" :total="props.pagination.total" />
      </div>
      <div class="w-full flex justify-end my-6" v-else>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" background
          :default-page-size="props.pagination.pageSize" :current-page="props.pagination.currentPage"
          layout="total, sizes, prev, pager, next, jumper" :total="props.pagination.total" />
      </div>
    </template>
  </el-card>
</template>


<script setup lang="tsx">
// 改变了父组件的对象值，eslint不允许，数据单项传递。所以忽略了。
import { reactive } from 'vue'
import { appInfoStore } from '@/stores/index'

interface TableColums {
  type?: string // selection 
  align?: string //位置  center || left || right
  prop?: string, // 字段
  label?: string // 名称
  width?: string // 列宽度
  fixed?: string | boolean  // 固定列
}

let props = defineProps<{
  data: any
  columns: TableColums[]
  pagination?: any
  loading?: boolean
  border?: boolean  // 表格线
  stripe?: boolean  // 斑马条
}>()

const emit = defineEmits<{
  (e: 'paginationChange', pagination: any): void
  (e: 'selectionChange', value: any): void
}>()

const state = reactive({
  query: {
    user: '',
    region: '',
    date: '',
  }
})


const selectionChange = (e: any) => {
  emit('selectionChange', e)
}

//查询确认
const querySubmit = () => {
  console.log(state.query, '>>>>>>>>');
}

// 页面数据限制改变
const sizeChange = (e: number) => {
  // eslint-disable-next-line
  props.pagination.pageSize = e
  sessionStorage.setItem('MyTable', JSON.stringify(props.pagination))
  emit('paginationChange', props.pagination)
}

// 当前页改变
const currentChange = (e: number) => {
  // eslint-disable-next-line
  props.pagination.currentPage = e
  sessionStorage.setItem('MyTable', JSON.stringify(props.pagination))
  emit('paginationChange', props.pagination)
}

</script>

<style scoped></style>