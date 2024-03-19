<!--
 * @Author: bbw 1526699702@qq.com
 * @Date: 2024-01-17 15:10:30
 * @LastEditors: bbw 1526699702@qq.com
 * @LastEditTime: 2024-01-17 15:29:10
 * @FilePath: \vue3-templates\src\views\table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="h-full  px-5">
    <TableList v-slot="{ state, commands }">
      <!-- 查询 -->
      <div class="w-full py-4">
        <el-card class="px-4">
          <MyForm :formData="formData" :formConfig="formConfig" :footer="true" class="mt-[18px]"
            :size="appInfoStore().data.isMobile ? 'small' : 'default'" :inline="true"></MyForm>
        </el-card>
      </div>

      <el-card class="w-full h-[calc(100%-140px)] p-5">
        <!-- 表格 -->
        <div class="w-full h-full">
          <MyTable ref="myTable" :data="state.data" :columns="state.columns" :pagination="state.pagination"
            @paginationChange="commands.get" :loading="state.loading" :border="true" :stripe="true">
            <template #action="{ }">
              <el-button plain size="small" @click="putData">修改</el-button>
              <el-popconfirm title="Are you sure to delete this?">
                <template #reference>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </MyTable>
        </div>

        <!-- 弹框 -->
        <MyDrawer ref="myDrawer"></MyDrawer>
      </el-card>
    </TableList>
  </div>
</template>

<script lang="ts" setup>
import { MyForm, MyTable, MyDrawer } from '@/components/page'
import TableList from '@/models/table/table.list'
import { ref, reactive } from 'vue'
import { appInfoStore } from '@/stores'

const myDrawer = ref()

const putData = () => {
  myDrawer.value.changeDialog(true)
}

const formData = reactive({
  name: '',
  number: 0,
  checkbox: [1],
  colorPicker: '#000'
})

const formConfig = reactive([
  {
    type: 'input',
    prop: 'input',
    label: 'input',
    // required: false,
    rules: { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur', required: true }
  }
  // {
  //   type: 'select',
  //   prop: 'select',
  //   label: 'select',
  //   required: false,
  //   options: [
  //     { label: 'A', value: 1 },
  //     { label: 'B', value: 2 },
  //     { label: 'C', value: 3 }
  //   ],
  //   multiple: true
  // },
])
</script>

<style scoped>
/* :deep(.el-card__body) {
  padding: 0 !important;
} */
</style>
