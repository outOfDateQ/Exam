<template>
  <div class="layout-container">
    <div class="tabbar">
      <h1>{{ otherStore.testTitle }}</h1>
      <div class="right">
        <template v-if="otherStore.testTitle === 'AOPA理论考试系统'">
          <span>{{ userStore.currentUser.name }}，</span>
          <span>您好，</span>
          <span>(这是您今日第1次登录)</span>
          <!-- <el-button type="primary" @click="logout">退出</el-button> -->
          <div class="logout" @click="logout">
            <span>退出</span>
            <i class="iconfont icon-24gl-extractLeft"></i>
          </div>
        </template>
        <template v-else>
          <span>{{ userStore.currentUser.name }}({{ userStore.currentUser.idCard }})</span>
        </template>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>

    <!-- 提示是否退出的模态框 -->
    <el-dialog v-model="dialogVisible" title="确认退出登录" width="40%">
      <span>是否退出当前账号？</span>
      <template #footer>
        <el-button type="default" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="ensureLogout">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useOtherStore from '@/store/modules/other'
import useUserStore from '@/store/modules/user'
import { ref } from 'vue'

const dialogVisible = ref(false)

const otherStore = useOtherStore()
const userStore = useUserStore()

const router = useRouter()

const logout = () => {
  dialogVisible.value = true
}

const ensureLogout = () => {
  router.replace('/login')
}
</script>

<style lang="scss" scoped>
.layout-container {
  .tabbar {
    height: 60px;
    background-color: #3C3F50;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    color: #fff;

    h1 {
      font-size: 20px;
    }

    .right {
      display: flex;
      font-size: 15px;

      // .el-button {
      //   margin-left: 20px;
      // }

      .logout {
        margin-left: 20px;
        cursor: pointer;

        i {
          margin-left: 6px;
        }
      }
    }
  }

  .content {
    height: calc(100vh - 60px);
    background-color: #E9ECF5;
    padding: 20px;
  }
}
</style>