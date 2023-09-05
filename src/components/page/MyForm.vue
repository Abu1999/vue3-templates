<!-- eslint-disable -->
<template>
  <div class="w-full h-full">
    <el-form ref="formRef" :inline="props.inline" :model="props.formData" label-width="auto"
      :label-position="props.labelPosition" :size="props.size">
      <template v-for="(item, index) in props.formConfig" :key="index">
        <!-- 选择框 -->
        <el-form-item v-if="item.type === 'select'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-select v-model="props.formData[item.prop]" :multiple="item.multiple" collapse-tags collapse-tags-tooltip
            :placeholder="item.placeholder ?? ('请输入' + item.label)" style="width: 240px">
            <el-option v-for="list in item.options" :key="list.value" :label="list.label" :value="list.value" />
          </el-select>
        </el-form-item>

        <!-- 事件日期选择框 -->
        <el-form-item v-else-if="item.type && datePicker.includes(item.type)" :prop="item.prop" :label="item.label"
          :size="item.size" :rules="item.rules ?? setRules(item)">
          <el-date-picker v-model="props.formData[item.prop]" :type="item.type as any ?? 'date'"
            :placeholder="item.placeholder ?? ('请输入' + item.label)" />
        </el-form-item>

        <!-- 数字框 -->
        <el-form-item v-else-if="item.type === 'number'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-input-number v-model="props.formData[item.prop]" :precision="2" :step="0.1" :min="item.min"
            :max="item.max" />
        </el-form-item>


        <!-- 多选框 -->
        <el-form-item v-else-if="item.type === 'checkbox'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-checkbox-group v-model="props.formData[item.prop]">
            <el-checkbox v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item v-else-if="item.type === 'checkboxButton'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-checkbox-group v-model="props.formData[item.prop]">
            <el-checkbox-button v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <!-- 单选框 -->
        <el-form-item v-else-if="item.type === 'radio'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-radio-group v-model="props.formData[item.prop]">
            <el-radio v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-else-if="item.type === 'radioButton'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-radio-group v-model="props.formData[item.prop]">
            <el-radio-button v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- 开关 -->
        <el-form-item v-else-if="item.type === 'switch'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-switch v-model="props.formData[item.prop]" />
        </el-form-item>

        <!-- 取色器 -->
        <el-form-item v-else-if="item.type === 'colorPicker'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)">
          <el-color-picker v-model="props.formData[item.prop]" show-alpha />
        </el-form-item>


        <el-form-item v-else :prop="item.prop" :label="item.label" :rules="item.rules ?? setRules(item)"
          :size="item.size">
          <el-input v-model="props.formData[item.prop]" :placeholder="item.placeholder ?? ('请输入' + item.label)" />
        </el-form-item>
      </template>

      <el-form-item v-if="props.footer">
        <el-button type="primary" @click="submitForm(formRef)">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { EpPropMergeType } from 'element-plus/es/utils';
import type { FormInstance } from 'element-plus'

interface Props {
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined // 尺寸
  labelPosition?: EpPropMergeType<StringConstructor, "top" | "right" | "left", unknown> | undefined
  inline?: boolean  // 同行
  footer?: boolean
  formConfig?: FormConfig[] // 配置
  formData: any
}

interface FormConfig {
  type?: string, // 'select'| datePicker | 'number' | checkbox | checkboxButton | checkbox | checkboxButton | switch 
  prop: string,
  label: string,
  placeholder?: string, //提示语
  rules?: any,  // 规则
  required?: boolean | string // 必填 或 提示
  options?: any // 数据配置
  multiple?: boolean // 多选
  min?: number // 最小值
  max?: number // 最大值
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined  // 尺寸 
}

const datePicker = ['date', 'dates', 'datetime', "daterange", 'datetimerange', 'week', 'month', "monthrange", 'year', 'yearmerange']

const formRef = ref<FormInstance>()
const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  labelPosition: 'left',
  inline: true,
  footer: false,
  formData: []
})


const setRules = (item: FormConfig) => [
  {
    required: item.required,
    message: typeof (item.required) == 'boolean' ? `请输入${item.label}` : item.required,
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

<style></style>