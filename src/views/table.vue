<template>
  <TableList v-slot="{ state, commands }">
    <MyTable :data="state.data" :columns="state.columns" @sizeChange="commands.get" @currentChange="commands.get" />
  </TableList>
</template>

<script lang="ts" setup>
import MyTable from "@/components/page/MyTable.vue"
import TableList from "@/models/table/table.list"

</script>

<style scoped></style>