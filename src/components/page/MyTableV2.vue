<template>
  <div class="w-full mb-2">
    <el-form :inline="true" :model="state.query">
      <el-form-item v-model="state.query.user" label="Approved by" size="default">
        <el-input placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item v-model="state.query.region" label="Activity zone" size="default">
        <el-select placeholder="Activity zone" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item v-model="state.query.date" label="Activity time" size="default">
        <el-date-picker type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item size="default">
        <el-button type="primary" @click="querySubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

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

  <div class="w-full flex justify-end mt-6">
    <el-pagination @size-change="sizeChange" @current-change="currentChange" background
      :default-page-size="state.pagination.pageSize" :current-page="state.pagination.currentPage"
      layout="total, sizes, prev, pager, next, jumper" :total="state.pagination.total" />
  </div>
</template>

<script lang="tsx" setup>
import { reactive, computed } from 'vue'
import { ElCheckbox, ElMessage } from 'element-plus'

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
state.data = computed(() => props.data)
state.columns = computed(() => props.columns)
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
state.pagination = computed(() => props.pagination)

if (sessionStorage.getItem('TableList')) Object.keys(state.pagination).forEach(i => { state.pagination[i] = JSON.parse(sessionStorage.getItem('TableList') as any)[i] || state.pagination[i] });

const querySubmit = () => {
  console.log(state.query, '>>>>>>>>');
}

const currentChange = (e: number) => {
  state.pagination.currentPage = e
  sessionStorage.setItem('TableList', JSON.stringify(state.pagination))
  emit('paginationChange', state.pagination)
}
const sizeChange = (e: number) => {
  state.pagination.pageSize = e
  sessionStorage.setItem('TableList', JSON.stringify(state.pagination))
  emit('paginationChange', state.pagination)
}
</script>

<style scoped></style>