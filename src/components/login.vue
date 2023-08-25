<template>
  <div class="w-full flex justify-center" style="height: 100vh;">
    <div style="margin-top: 30vh;">
      <el-card shadow="always" style="width: 500px;" v-if="type === 'login'">
        <div class="flex flex-col items-center">
          <div class="text-3xl">欢迎登录</div>
          <div class="mt-8">
            <el-form ref="ruleFormRef" :rules="loginRules" size="default" :label-position="labelPosition"
              label-width="100px" :model="loginData" style="max-width: 460px">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="loginData.name" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="loginData.password" type="password" show-password />
              </el-form-item>
              <div class="w-11/12 flex justify-end">
                <el-link :underline="false" type="primary" @click="type = 'signin'">注册</el-link>
              </div>
              <el-button :loading="loading" size="large" class="w-full mt-5" type="primary"
                @click="submit(ruleFormRef)">登录</el-button>
            </el-form>
          </div>
        </div>
      </el-card>

      <el-card shadow="always" style="width: 500px;" v-else>
        <div class="flex justify-start items-center w-full" @click="type = 'login'">
          <el-link :underline="false" type="primary" @click="type = 'signin'">
            <el-icon>
              <Back />
            </el-icon>
            <div class="ml-1">
              返回登录
            </div>
          </el-link>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-3xl">用户注册</div>
          <div class="mt-8">
            <el-form ref="ruleFormRef" :rules="signinRules" size="default" :label-position="labelPosition"
              label-width="100px" :model="signinData" style="max-width: 460px">
              <el-form-item label="用户名" prop="name">
                <el-input v-model="signinData.name" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="signinData.password" type="password" show-password />
              </el-form-item>

              <el-button :loading="loading" size="large" class="w-full mt-5" type="primary"
                @click="signin(ruleFormRef)">注册</el-button>
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
let type = ref('login')

let labelPosition = ref('left' as any)
const loginRules = reactive<FormRules<typeof loginData>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
const signinRules = reactive<FormRules<typeof signinData>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

const loginData = reactive({
  name: 'admin',
  password: 'admin',
})
const signinData = reactive({
  name: '',
  password: '',
})

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid: any) => {
    if (valid) {
      // console.log('submit!')
      if (loginData.name === 'admin' && loginData.password === 'admin') {
        ElMessage.success('登录成功')
        localStorage.setItem('token', '123')
        router.push('/')
      } else {
        ElMessage.error('登录失败')
      }
      loading.value = false
    }
  })
}

const signin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid: any) => {
    console.log(valid);
    if (valid) {
      loading.value = false
    }
  })
}


</script>

<style scoped></style>