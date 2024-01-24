<!-- eslint-disable -->
<template>
  <div class="w-full h-full">
    <el-form ref="formRef" :inline="props.inline" :model="props.data" label-width="auto"
      :label-position="props.labelPosition" :size="props.size" :disabled="props.disabled"
      @submit.native.prevent="() => submitForm()">
      <template v-for="(item, index) in props.formConfig" :key="index">
        <!-- 选择框 -->
        <el-form-item v-if="item.type === 'select'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-select v-model="props.data[item.prop]" :disabled="item.disabled" :multiple="item.multiple" collapse-tags
            collapse-tags-tooltip :max-collapse-tags="item.collapse ?? 2"
            :placeholder="item.placeholder ?? ('请选择' + item.label)">
            <el-option v-for="list in item.options" :key="list.value" :label="list.label" :value="list.value" />
          </el-select>
        </el-form-item>

        <!-- 事件日期选择框 -->
        <el-form-item v-else-if="item.type && datePicker.includes(item.type)" :prop="item.prop" :label="item.label"
          :size="item.size" :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-date-picker v-model="props.data[item.prop]" :type="item.type as any ?? 'date'" :disabled="item.disabled"
            :placeholder="item.placeholder ?? ('请选择' + item.label)" :value-format="item.valueFormat" />
        </el-form-item>

        <!-- 数字框 -->
        <el-form-item v-else-if="item.type === 'number'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-input-number :placeholder="item.placeholder ?? ('请输入' + item.label)" v-model="props.data[item.prop]"
            :disabled="item.disabled" :precision="2" :step="0.1" :min="item.min" :max="item.max" />
        </el-form-item>


        <!-- 多选框 -->
        <el-form-item v-else-if="item.type === 'checkbox'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-checkbox-group v-model="props.data[item.prop]" :placeholder="item.placeholder ?? ('请选择' + item.label)"
            :disabled="item.disabled">
            <el-checkbox v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item v-else-if="item.type === 'checkboxButton'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">

          <el-checkbox-group v-model="props.data[item.prop]" :placeholder="item.placeholder ?? ('请选择' + item.label)"
            :disabled="item.disabled">
            <el-checkbox-button v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <!-- 单选框 -->
        <el-form-item v-else-if="item.type === 'radio'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-radio-group v-model="props.data[item.prop]" :placeholder="item.placeholder ?? ('请选择' + item.label)"
            :disabled="item.disabled">
            <el-radio v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-else-if="item.type === 'radioButton'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-radio-group v-model="props.data[item.prop]" :placeholder="item.placeholder ?? ('请选择' + item.label)"
            :disabled="item.disabled">
            <el-radio-button v-for="list in item.options" :key="list.value" :label="list.value">
              {{ list.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- 开关 -->
        <el-form-item v-else-if="item.type === 'switch'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-switch v-model="props.data[item.prop]" :placeholder="item.placeholder ?? ('请选择' + item.label)"
            :disabled="item.disabled" />
        </el-form-item>

        <!-- 取色器 -->
        <el-form-item v-else-if="item.type === 'colorPicker'" :prop="item.prop" :label="item.label" :size="item.size"
          :rules="item.rules ?? setRules(item)" :required="item.required">
          <el-color-picker v-model="props.data[item.prop]" show-alpha
            :placeholder="item.placeholder ?? ('请选择' + item.label)" :disabled="item.disabled" />
        </el-form-item>

        <!-- 密码框 -->
        <el-form-item v-else-if="item.type === 'password'" :prop="item.prop" :label="item.label"
          :rules="item.rules ?? setRules(item)" :size="item.size" :required="item.required">
          <el-input v-model="props.data[item.prop]" type="password" show-password
            :placeholder="item.placeholder ?? ('请输入' + item.label)" :disabled="item.disabled" />
        </el-form-item>
        <!-- 文本域 -->
        <el-form-item v-else-if="item.type === 'textarea'" :prop="item.prop" :label="item.label"
          :rules="item.rules ?? setRules(item)" :size="item.size" :required="item.required">
          <el-input v-model="props.data[item.prop]" type="textarea" :autosize="{ minRows: 4 }"
            :placeholder="item.placeholder ?? ('请输入' + item.label)" :disabled="item.disabled" />
        </el-form-item>
        <!-- slot插槽 -->
        <el-form-item v-else-if="item.type === 'slot'" :prop="item.prop" :label="item.label"
          :rules="item.rules ?? setRules(item)" :size="item.size" :required="item.required">
          <slot :name="item.prop" :data="item" :disabled="item.disabled"></slot>
        </el-form-item>

        <el-form-item v-else :prop="item.prop" :label="item.label" :rules="item.rules ?? setRules(item)" :size="item.size"
          :required="item.required">
          <el-input v-model="props.data[item.prop]" :placeholder="item.placeholder ?? ('请输入' + item.label)"
            :disabled="item.disabled" />
        </el-form-item>
      </template>

      <el-form-item v-if="props.footer">
        <el-button type="primary" @click="submitForm()"><el-icon>
            <Search />
          </el-icon><span>搜索</span> </el-button>
      </el-form-item>

      <el-form-item>
        <slot name="action" :submitForm="submitForm" :resetForm="resetForm"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { EpPropMergeType } from 'element-plus/es/utils';
import type { FormInstance } from 'element-plus'
defineOptions({
  name: 'MyForm'
})


interface Props {
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined// 尺寸
  labelPosition?: EpPropMergeType<StringConstructor, "top" | "right" | "left", unknown> | undefined
  inline?: boolean  // 同行
  footer?: boolean
  formConfig?: FormConfig[]  // 配置
  data: any
  disabled?: boolean
}

interface FormConfig {
  type?: string, // 'select'| datePicker | 'number' | checkbox | checkboxButton | checkbox | checkboxButton | switch | password | textarea | slot
  prop: string,
  label: string,
  disabled?: boolean,
  placeholder?: string, //提示语
  rules?: any,  // 规则
  required?: boolean | any // 必填 或 提示
  options?: any // 数据配置
  multiple?: boolean // 多选
  min?: number // 最小值
  max?: number // 最大值
  size?: EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown> | undefined  // 尺寸 
  collapse?: number //select多选标签数
  valueFormat?: string, // 时间格式
}

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const datePicker = ['date', 'dates', 'datetime', "daterange", 'datetimerange', 'week', 'month', "monthrange", 'year', 'yearmerange']

const formRef = ref<FormInstance>()
const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  labelPosition: 'left',
  inline: false,
  footer: false,
  data: [],
  disabled: false
})


const setRules = (item: FormConfig) => [
  {
    required: item.required,
    message: item.placeholder ?? (typeof (item.required) == 'boolean' ? `请输入${item.label}` : item.required),
    trigger: 'blur'
  }
]

// 确定按钮
const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit')
    } else {
      console.log('error submit!')
      return false
    }
  })
  // resetForm()
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

// 通过ref传递方法,父组件触发
defineExpose({ submitForm, resetForm })

</script>

<style scoped></style>