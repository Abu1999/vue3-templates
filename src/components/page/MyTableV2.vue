<template>
  <!-- 查询 -->
  <div class="w-full mb-2">
    <el-form :inline="true" :model="state.query">
      <el-form-item v-model="state.query.user" label="Approved by">
        <el-input placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item v-model="state.query.region" label="Activity zone">
        <el-select class="w-1/3" placeholder="Activity zone" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item v-model="state.query.date" label="Activity time">
        <el-date-picker class="w-1/3" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="querySubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <!-- 表格 -->
  <div style="height: 70vh; width:100%">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2 :columns="state.columns" :data="state.data" :width="width" :height="height" :fixed="false">
          <template #overlay v-if="!props.data || props.loading">
            <div class="w-full h-full flex justify-center items-center" style="background-color: rgba(255,255,255,.8);">
              <el-icon class="is-loading" color="var(--el-color-primary)" :size="26">
                <Loading />
              </el-icon>
            </div>
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </div>

  <!-- 分页 -->
  <div class="w-full flex justify-end my-6" v-if="appInfoStore().data.isMobile">
    <el-pagination @size-change="sizeChange" @current-change="currentChange" background small :pager-count="4"
      :default-page-size="state.pagination.pageSize" :current-page="state.pagination.currentPage"
      layout="prev, pager, next, jumper" :total="state.pagination.total" />
  </div>
  <div class="w-full flex justify-end my-6" v-else>
    <el-pagination @size-change="sizeChange" @current-change="currentChange" background
      :default-page-size="state.pagination.pageSize" :current-page="state.pagination.currentPage"
      layout="total, sizes, prev, pager, next, jumper" :total="state.pagination.total" />
  </div>
</template>

<script lang="tsx" setup>
import { reactive, computed, watch, onMounted, ref } from 'vue'
import { ElCheckbox, ElMessage } from 'element-plus'
import { appInfoStore } from '@/stores/index'
import { useScroll } from '@vueuse/core';

let props = defineProps<{
  data: any
  columns: any
  pagination: any
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'paginationChange', pagination: any): void
}>()

const state = reactive({
  data: [] as any, // 行数据
  columns: [] as any, // 列数据
  pagination: {
    pageSize: 10, // 单页数据量
    currentPage: 1,  // 当前页数
    total: 1000// 总数据量
  } as any,
  query: {
    user: '',
    region: '',
    date: '',
  }
})

//查询确认
const querySubmit = () => {
  console.log(state.query, '>>>>>>>>');
}

// 当前页改变
const currentChange = (e: number) => {
  state.pagination.currentPage = e
  sessionStorage.setItem('TableList', JSON.stringify(state.pagination))
  emit('paginationChange', state.pagination)
}

// 页面数据限制改变
const sizeChange = (e: number) => {
  state.pagination.pageSize = e
  sessionStorage.setItem('TableList', JSON.stringify(state.pagination))
  emit('paginationChange', state.pagination)
}

// 监听数据
watch(() => props.data, () => {
  state.data = props.data
}, { deep: true, immediate: true })

//监听列数据
watch(() => props.columns, () => {
  state.columns = JSON.parse(JSON.stringify(props.columns))
  state.columns.unshift({
    dataKey: 'select',
    minWidth: '50',
    cellRenderer: (data: any) => {
      const onChange = (e: any) => {
        console.log(data, e);
      }
      return (
        <ElCheckbox v-model={data.rowData.select} onChange={onChange}>
        </ElCheckbox>
      )
    },
    headerCellRenderer: (data: any) => {
      const onChange = (e: any) => {
        console.log(data, e);
        props.data.map((list: any) => { list.select = e })
      }
      let allSelected: Boolean = props.data.every((row: any) => row.select)
      return (
        <ElCheckbox v-model={allSelected} onChange={onChange} indeterminate={true} >
        </ElCheckbox >
      )
    },
  })
}, { deep: true, immediate: true })

//监听页数
watch(() => props.pagination, () => {
  state.pagination = props.pagination
  if (sessionStorage.getItem('TableList')) Object.keys(state.pagination).forEach(i => { state.pagination[i] = JSON.parse(sessionStorage.getItem('TableList') as any)[i] || state.pagination[i] });
}, { deep: true, immediate: true })

</script>

<style scoped lang="scss">
:deep(.el-table-v2) {
  .el-table-v2__body>div:first-child {
    overflow: auto !important;
  }

}
</style>