<template>
  <div class="p-5">
    <TableList v-slot="{ state, commands }">
      <!-- 查询 -->
      <el-card class="mb-3">
        <MyForm :footer="true" class="mt-[18px]"></MyForm>
      </el-card>

      <el-card>
        <!-- 表格 -->
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


        <!-- 弹框 -->
        <MyDrawer ref="myDrawer"></MyDrawer>
      </el-card>
    </TableList>
  </div>
</template>

<script lang="ts" setup>
import { MyForm, MyTable, MyDrawer } from "@/components/page"
import TableList from "@/models/table/table.list"
import { ref } from "vue";

const myDrawer = ref()

const putData = () => {
  myDrawer.value.changeDialog(true)
}
</script>

<style scoped></style>