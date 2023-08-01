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
        <el-table-v2 :columns="state.columns" :data="state.data" :width="width" :height="height">
          <template #overlay v-if="!props.data">
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

<script lang="ts" setup>
import { reactive, computed } from 'vue'

const props = defineProps<{
  data: any
  columns: any
}>()

const emit = defineEmits<{
  (e: 'currentChange', pagination: any): void
  (e: 'sizeChange', pagination: any): void
}>()

const state = reactive({
  data: [] as any, // 行数据
  columns: [] as any, // 列数据
  pagination: {
    pageSize: 10, // 单页数据量
    currentPage: 1,  // 当前页数
    total: 1000// 总数据量
  },
  query: {
    user: '',
    region: '',
    date: '',
  }
})
state.data = computed(() => props.data)
state.columns = computed(() => props.columns)

state.pagination = sessionStorage.getItem('TableList') ? JSON.parse(sessionStorage.getItem('TableList') as any) : {
  pageSize: 10, // 单页数据量
  currentPage: 1,  //当前页数
  total: 1000, //总数据量
}


const querySubmit = () => {
  console.log(state.query, '>>>>>>>>');
}

const currentChange = (e: number) => {
  state.pagination.currentPage = e
  sessionStorage.setItem('TableList', JSON.stringify(state.pagination))
  emit('currentChange', state.pagination)
}
const sizeChange = (e: number) => {
  state.pagination.pageSize = e
  sessionStorage.setItem('TableList', JSON.stringify(state.pagination))
  emit('sizeChange', state.pagination)
}
</script>

<style scoped></style>