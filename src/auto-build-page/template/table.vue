<template>
  <"%Class%" v-slot="{ state, commands }">
    <div class="flex items-center font-bold pl-5 text-black h-9 bg-white ">分项清单</div>

    <div class="flex space-x-5 p-5 justify-center">
      <t-card class="w-2/12">
        <div style="height: 80vh;">
          <MyTree :key="state.treeData.key" :data="state.treeData.data" :loading="state.treeData.loading"
            :keys="{ label: 'name', value: 'id' }" :showSlot="true" :activable="true" :searchShow="true"
            @treeActive="nodeClick" :expandAll="true">
            <template #icon="{ node }">
              <t-icon v-if="!node.expanded && node.getChildren()" name="chevron-right" />
              <t-icon v-else-if="node.getChildren() && node.expanded" name="chevron-down" />
            </template>
          </MyTree>
        </div>
      </t-card>
      <t-card class="w-9/12">
        <!-- 搜索框 -->
        <div class="w-full flex flex-col items-center">
          <div class=" w-full flex items-center justify-between">
            <t-button @click="">新增</t-button>
            <div class="w-6/12 flex items-center justify-end">
              <t-input placeholder="名称/编号" v-model="state.queryParams.q" class="w-1/3">
                <template #suffix>
                  <t-button variant="text" @click="commands.getDate()">
                    <t-icon name="search"></t-icon>
                  </t-button>
                </template>
              </t-input>
              <t-icon class="mx-3" name="control-platform"></t-icon>
              <t-icon name="download"></t-icon>
            </div>
          </div>

          <!-- 数据内容 -->
          <div class="w-full mt-48 flex justify-center" v-if="state.loading">
            <t-loading></t-loading>
          </div>
          <div v-else>
            <MyTable :loading="state.loading" v-if="state.data" :pagination="state.queryParams.pagination"
              @onPageChange="(e: any) => { state.queryParams.pageChange(e) }" :data="state.data" :columns="tableColumns"
              rowKey="id" :colSlot="['operation']" :filterValue="state.queryParams.filter" @filterChange="() => { }"
              :filterRow="() => null">
              <template #operation="{ row, rowIndex }">
                <div>
                  <t-button variant="text" size="small"
                    @click="state.putData = JSON.parse(JSON.stringify(row)); state.putFromInfo.visible = true;"
                    theme="primary">编辑</t-button>
                  <t-popconfirm theme="danger" @confirm="() => { commands.delData(row.id) }">
                    <template #content>
                      <p class="title" style="font-weight: 500;font-size: 14px;">是否确定删除数据 {{ row.name }}</p>
                      <p class="describe" style="margin-top: 8px;font-size: 12px;color: var(--td-text-color-secondary);">
                        删除后不可恢复，请谨慎操作！
                      </p>
                    </template>
                    <t-button variant="text" class="text-xs" theme="primary" size="small">删除</t-button>
                  </t-popconfirm>
                </div>
              </template>
            </MyTable>
          </div>
        </div>
      </t-card>
    </div>
  </"%Class%">
</template>

<script setup lang="ts">
//@ts-ignore 
import { MyTree } from '@myfront/tdesign-components'
import { reactive, ref, onMounted, watch } from "vue";
import "%Class%" from '@/models/"%class%"/"%class%".list'
import { tableColumns } from '@/models/"%class%"/"%class%".config'


// 结构树点击
const nodeClick = (e: any) => {
  if (e.context.node.data.children.length > 0) {
    return
  } else {
    sessionStorage.setItem('projectID', e.context.node.data.projectID)
  }
}


// 搜索框


</script>

<style scoped></style>

<route>
{
  "meta": {
    "title": ""%title%""
  }
}
</route>