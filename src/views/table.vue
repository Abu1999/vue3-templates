<template>
  <div class="p-5">
    <TableList v-slot="{ state, commands }">
      <MyTable :data="state.data" :columns="state.columns" :pagination="state.pagination" @paginationChange="commands.get"
        :loading="state.loading" :border="true" :stripe="true">
        <template #action="{ row }">
          <div>
            <el-button type="danger">删除</el-button>
          </div>
        </template>
      </MyTable>
    </TableList>
  </div>
</template>

<script lang="ts" setup>
import MyTable from "@/components/page/MyTable.vue"
import TableList from "@/models/table/table.list"

</script>

<style scoped></style>