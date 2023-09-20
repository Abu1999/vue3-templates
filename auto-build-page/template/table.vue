<template>
  <div class="px-5 overflow-auto">
    <"%Class%" v-slot="{ state, commands }">
      <!-- 查询 -->
      <div class="w-full h-full flex space-x-5">
        <div class="w-1/3 h-full min-w-[200px]">
          <el-card class="mt-[2vh]">
            <div>
              <MyTree :data="[]" @nodeClick="(e) => { nodeClick(e, state, commands) }"></MyTree>
            </div>
          </el-card>
        </div>
        <div class="w-full h-full">
          <!-- 查询 -->
          <el-card class="my-[2vh] px-4">
            <MyForm :inline="true" :data="state.form.data" :formConfig="formConfig" :footer="true" class="mt-[18px]"
              :size="appInfoStore().data.isMobile ? 'small' : 'default'" @submit="commands.search">
              <template #action>
                <el-button type="primary" @click="add(state, commands)"><el-icon>
                    <EditPen />
                  </el-icon><span>添加</span> </el-button>
              </template>
            </MyForm>
          </el-card>

          <el-card class="w-full h-full p-4">
            <!-- 表格 -->
            <div class="overflow-auto">
              <MyTable ref="myTable" :data="state.table.data" :columns="tableColumns" :pagination="state.table.pagination"
                @paginationChange="commands.get" :loading="state.table.loading" :border="true" :stripe="true">
                <template #action="{ row }">
                  <el-button type="success" size="small" @click="change(state, commands, row)">修改</el-button>
                  <el-popconfirm title="确定删除用户?" @confirm="commands.del(row)">
                    <template #reference>
                      <el-button type="danger" size="small">删除</el-button>
                    </template>
                  </el-popconfirm>
                </template>
              </MyTable>
            </div>

          </el-card>
        </div>
      </div>
      <!-- 弹框 -->
      <MyDrawer :config="state.drawer.config" @confirm="confirm(state, commands)" @cancel="cancel(state, commands)">
        <MyForm ref='"%class%"From' :data="state.drawer.data"
          :formConfig="mode == 'post' ? drawerFormPost : drawerFormPut" :footer="false"
          @submit="mode == 'post' ? commands.post() : commands.put(rowData)">
        </MyForm>
      </MyDrawer>
    </"%Class%">
  </div>
</template>

<script setup lang="ts">
import { MyForm, MyTable, MyDrawer } from "@/components/page"
import { appInfoStore } from "@/stores";
import "%Class%" from '@/models/admin/"%class%"/"%class%".list'
import { tableColumns, formConfig, drawerFormPut, drawerFormPost } from '@/models/admin/"%class%"/"%class%".config'
import { ref } from "vue";


let mode = ref('post')
let rowData = ref()
let "%class%"From = ref()
let nowSelectTree = ref()

const add = (state: any, commands: any) => {
  state.drawer.data = {}
  mode.value = 'post'
  state.drawer.config.title = '创建人员'
  state.drawer.config.dialog = true
}

const nodeClick = (e: any, state: any, commands: any) => {
  nowSelectTree.value = e
  commands.getItem(e.id)
}

const change = (state: any, commands: any, row: any) => {
  mode.value = 'put'
  rowData.value = row
  state.drawer.config.title = '修改人员'
  commands.getItem(row.id);
  state.drawer.config.dialog = true
}
const confirm = (state: any, commands: any) => {
  "%class%"From.value.submitForm()
}
const cancel = (state: any, commands: any) => {
  "%class%"From.value.resetForm()
  state.drawer.data = {}
  state.drawer.config.dialog = false
}

</script>

<style scoped></style>


