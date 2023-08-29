<template>
  <el-form ref="formRef" :inline="props.inline" :model="formData" label-width="auto" :label-position="props.labelPosition"
    :size="props.size">
    <template v-for="(item, index) in formConfig" :key="index">

      <el-form-item :prop="item.prop" :label="item.lable" :rules="item.rules ?? setRules(item)">
        <el-input v-model="formData[item.prop]" />
      </el-form-item>
    </template>

    <el-form-item v-if="props.footer">
      <el-button type="primary" @click="submitForm(formRef)">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { EpPropMergeType } from 'element-plus/es/utils';
import type { FormInstance } from 'element-plus'

interface Props {
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined // 大小
  labelPosition?: EpPropMergeType<StringConstructor, "top" | "right" | "left", unknown> | undefined
  inline?: boolean
  footer?: boolean
}

interface FormConfig {
  type?: string,
  prop: string,
  lable: string,
  rules?: any,
  required?: boolean | string
}

3
const formRef = ref<FormInstance>()
const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  labelPosition: 'left',
  inline: true,
  footer: false
})

const formData = reactive({
  name: ''
} as { [key: string]: any })
const formConfig: FormConfig[] = reactive([
  {
    type: 'input',
    prop: 'name',
    lable: '名字',
    required: true
  },
  {
    type: 'input',
    prop: 'age',
    lable: '年龄',
    required: true
  }
])

const setRules = (item: FormConfig) => [
  {
    required: item.required,
    message: typeof (item.required) == 'boolean' ? `请输入${item.lable}` : item.required,
    trigger: 'blur'
  }
]

// 确定按钮
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style>
.el-radio-group {
  margin-right: 12px;
}
</style>