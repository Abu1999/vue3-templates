<template>
  <TestList v-slot="{ state }">
    <div>
      {{ state.data }}
    </div>

  </TestList>
</template>

<script setup lang="ts">
import TestList from '@/models/test/test.list'

</script>

<style scoped></style>