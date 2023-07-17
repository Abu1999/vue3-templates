<template>
  <div class="w-full flex justify-center" style="height: 100vh;">
    <div style="margin-top: 30vh;">
      <el-card shadow="always" style="width: 500px;">
        <div class="flex flex-col items-center">
          <div class="text-3xl">欢迎登录</div>
          <div class="mt-8">
            <el-form ref="ruleFormRef" :rules="rules" size="default" :label-position="labelPosition" label-width="100px"
              :model="formData" style="max-width: 460px">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="formData.name" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" type="password" show-password />
              </el-form-item>
              <el-button :loading="loading" size="large" class="w-full mt-5" type="primary"
                @click="submit(ruleFormRef)">登录</el-button>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script setup lang="ts">
import 'element-plus/es/components/message/style/css'
import { reactive, ref } from 'vue'
import { type FormInstance, type FormRules, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()
const ruleFormRef = ref()
let loading = ref(false)

let labelPosition = ref('left' as any)
const rules = reactive<FormRules<typeof formData>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

const formData = reactive({
  name: 'admin',
  password: 'admin',
})

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      console.log('submit!')
      if (formData.name === 'admin' && formData.password === 'admin') {
        ElMessage.success('登录成功')
        localStorage.setItem('token', '123')
        router.push('/')
      } else {
        ElMessage.error('登录失败')
      }
      loading.value = false
    } else {
      console.log('error submit!', fields)
      loading.value = false
    }
  })
}


</script>

<style scoped></style>