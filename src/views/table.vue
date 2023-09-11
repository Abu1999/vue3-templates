<template>
  <div class="px-5">
    <TableList v-slot="{ state, commands }">
      <!-- 查询 -->
      <el-card class="my-[2vh] p-0">
        <MyForm :formData="formData" :formConfig="formConfig" :footer="true" class="mt-[18px]"
          :size="appInfoStore().data.isMobile ? 'small' : 'default'"></MyForm>
      </el-card>

      <el-card class="p-5">
        <!-- 表格 -->
        <div>
          <MyTable ref="myTable" :data="state.data" :columns="state.columns" :pagination="state.pagination"
            @paginationChange="commands.get" :loading="state.loading" :border="true" :stripe="true">
            <template #action="{}">
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
import { MyForm, MyTable, MyDrawer } from "@/components/page"
import TableList from "@/models/table/table.list"
import { ref, reactive } from "vue";
import { appInfoStore } from "@/stores";

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
  },
  {
    type: 'select',
    prop: 'select',
    label: 'select',
    required: false,
    options: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 }
    ],
    multiple: true
  },

])
</script>

<style scoped>
/* :deep(.el-card__body) {
  padding: 0 !important;
} */
</style>