<template>
  <TableList v-slot="{ state, commands }">
    <MyTableV2 :data="state.data" :columns="state.columns" :pagination="state.pagination" @paginationChange="commands.get"
      :loading="state.loading" />
  </TableList>
</template>

<script lang="ts" setup>
import MyTableV2 from "@/components/page/MyTableV2.vue"
import TableList from "@/models/table/table.list"

</script>

<style scoped></style>