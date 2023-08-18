<template>
  <div class="container">
    <el-row>
      <!-- 图片 -->
      <el-col :span="11" :xs="0">
        <img class="poster" src="../../../public/images/poster.jpg">
      </el-col>
      <!-- 登录表单 -->
      <el-col :span="13" :xs="24">
        <div class="login-wrap">
          <span class="title">理论考试系统</span>
          <el-form ref="form" :model="formData" :rules="rules" inline>
            <el-form-item prop="username">
              <el-input style="margin-right: 70px;" @input="cancleError($event, 'u')" placeholder="账号(账号为您在机构使用的证件号)"
                type="text" v-model="formData.username" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input @input="cancleError($event, 'p')" placeholder="密码(密码为现场考试员告知的机构密码)" show-password type="password"
                v-model="formData.password" clearable></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useOtherStore from '@/store/modules/other'
import useUserStore from '@/store/modules/user'

// @ts-ignore
import RandomClass from '@/utils/createName'

// console.log(RandomClass.randomName())

const otherStore = useOtherStore()
const userStore = useUserStore()

const form = ref()

const router = useRouter()

const idCardReg = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/

const formData = reactive({
  username: '',
  password: ''
})

const validateUsername = (rule: any, val: any, callback: any) => {
  if (!idCardReg.test(val)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, val: any, callback: any) => {
  if (val.length !== 4) {
    callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [
    { trigger: 'change', validator: validateUsername }
  ],
  password: [
    { trigger: 'change', validator: validatePassword }
  ]
})

const login = async () => {
  try {
    await form.value.validate()
    otherStore.$reset()
    // 收集当前登录的用户的数据
    userStore.currentUser.name = RandomClass.randomName()
    userStore.currentUser.idCard = formData.username
    router.replace('/layout')
  } catch (e) {
    console.log(e)
  }
}

const cancleError = (ev: any, type: string) => {
  // console.log(ev)
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;

  .el-row {
    height: 100%;

    .el-col {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .poster {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
      }

      .login-wrap {
        display: flex;
        flex-direction: column;
        // width: 90%;
        position: relative;

        .title {
          color: #797477;
          margin-bottom: 80px;
          font-size: 30px;
          font-weight: 100;
        }

        .el-button {
          width: 70px;
          border-radius: 0;
          position: absolute;
          right: 32px;
          bottom: 0;
        }

        .el-form {
          // padding: 10px;
          // display: flex;
          // flex-direction: column;
          position: relative;
          margin-bottom: 30px;
          // display: flex;
          // justify-content: space-between;

          :deep .el-input__wrapper {
            border-radius: 0;
            outline: none;
            box-shadow: none;
            width: 280px;
            border-bottom: 1px solid #C9CCD0;
            margin-bottom: 5px;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>