<template>
  <div>
    <div class="w-full mb-2">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="Approved by" size="default">
          <el-input v-model="formInline.user" placeholder="Approved by" clearable />
        </el-form-item>
        <el-form-item label="Activity zone" size="default">
          <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time" size="default">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
        </el-form-item>
        <el-form-item size="default">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="height: 70vh">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
        </template>
      </el-auto-resizer>
    </div>

    <div class="w-full flex justify-end mt-6">
      <el-pagination @current-change="sizeChange" background :default-page-size="10"
        layout="total, sizes, prev, pager, next, jumper" :total="1000" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

const columns = generateColumns(100)
const data = generateData(columns, 200)


// 分页
const sizeChange = (e: number) => {
  console.log(e);

}
</script>

<style scoped>
:deep(.el-form-item) {
  margin-right: 10;
}
</style>