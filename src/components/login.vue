<template>
  <div
    class="w-full h-full flex justify-center items-center bg-[var(--el-bg-color-page)]"
    style="height: 100vh"
  >
    <div class="w-[960px] h-[540px]">
      <el-card shadow="always" v-if="type === 'login'" class="h-full">
        <div class="w-full h-full flex">
          <div class="w-7/12 h-full">
            <el-image class="w-full h-full" :src="bg"></el-image>
          </div>
          <div class="w-5/12 h-full p-4">
            <div class="w-full h-full flex flex-col items-center justify-center select-none">
              <div class="text-3xl">欢迎登录</div>
              <div class="mt-12">
                <el-form
                  ref="ruleFormRef"
                  :rules="loginRules"
                  size="default"
                  :label-position="labelPosition"
                  label-width="0"
                  :model="loginData"
                  style="max-width: 460px"
                >
                  <el-form-item label="" prop="name">
                    <el-input :prefix-icon="User" placeholder="用户名" v-model="loginData.name" />
                  </el-form-item>
                  <el-form-item label="" prop="password">
                    <el-input
                      v-model="loginData.password"
                      :prefix-icon="Lock"
                      placeholder="密码"
                      type="password"
                      show-password
                    />
                  </el-form-item>
                  <div class="w-11/12 flex justify-end">
                    <!-- <el-link :underline="false" type="primary" @click="type = 'signin'">注册</el-link> -->
                  </div>
                  <el-button
                    :loading="loading"
                    size="large"
                    class="w-full mt-5"
                    type="primary"
                    @click="submit(ruleFormRef)"
                    >登录</el-button
                  >
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card shadow="always" v-else class="p-5">
        <div class="flex justify-start items-center w-full" @click="type = 'login'">
          <el-link :underline="false" type="primary" @click="type = 'signin'">
            <el-icon>
              <Back />
            </el-icon>
            <div class="ml-1">返回登录</div>
          </el-link>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-3xl">用户注册</div>
          <div class="mt-8">
            <el-form
              ref="ruleFormRef"
              :rules="signinRules"
              size="default"
              :label-position="labelPosition"
              label-width="100px"
              :model="signinData"
              style="max-width: 460px"
            >
              <el-form-item label="" prop="name">
                <el-input :prefix-icon="Phone" placeholder="手机号" v-model="signinData.name" />
              </el-form-item>
              <!-- <el-form-item label="" prop="code">
                <el-input :prefix-icon="Message" placeholder="验证码" v-model="signinData.code" class="input-with-select">
                  <template #append>
                    <el-button :disabled="signinData.disabled" @click="send">{{ signinData.title }}</el-button>
                  </template>
                </el-input>
              </el-form-item> -->

              <el-button
                :loading="loading"
                size="large"
                class="w-full mt-5"
                type="primary"
                @click="signin(ruleFormRef)"
                >注册</el-button
              >
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'element-plus/es/components/message/style/css'
import { reactive, ref, onMounted } from 'vue'
import { type FormInstance, type FormRules, ElMessage } from 'element-plus'
import { User, Lock, Phone, Message } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { changeMenu } from './login'
import bg from '@/assets/bg.jpg'

const router = useRouter()
const ruleFormRef = ref()
let loading = ref(false)
let bgLoading = ref(true)
let type = ref('login')

let labelPosition = ref('left' as any)
const loginRules = reactive<FormRules<typeof loginData>>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const signinRules = reactive<FormRules<typeof signinData>>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const loginData = reactive({
  name: 'admin',
  password: 'admin'
})
const signinData = reactive({
  name: '',
  password: ''
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

        changeMenu()
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
    console.log(valid)
    if (valid) {
      loading.value = false
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    bgLoading.value = false
  }, 1000)
})
</script>

<style scoped></style>
