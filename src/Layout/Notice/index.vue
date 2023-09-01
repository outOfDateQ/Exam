<template>
  <div class="notice-wrap">
    <div class="left">
      <NoticeItem :width="200" :left="30" content="考试须知" />
    </div>

    <div class="right">
      <el-card>
        <h2 class="title">请仔细阅读考试须知</h2>
        <NoticeItem v-for="(item, index) in noticeList" :key="index" :left="10" :content="item" :index="index"
          :topDown="45" />
        <el-button type="primary" :disabled="!able" @click="toExam">
          我已阅读<span v-if="!able">({{ seconds }})</span>
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoticeItem from './NoticeItem/index.vue'
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const seconds = ref(20)
const able = ref(false)

const noticeList = reactive([
  '选择您要参加的考试，点击“参加考试”可进入考试。',
  '考试答题期间严禁切换窗口、刷新、后退等操作！若答题中出现其他软件弹窗会提示20S后退出考试，请注意及时点击取消，倒计时结束后将无法继续进行考试',
  '考试提交后，请注意等待提交结果返回信息，确保提交成功再离开考场。',
  '考试完成后，请点击右上角退出账号登录状态，方便下一个学员进行考试。'
])

onMounted(() => {
  const timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value -= 1
    } else {
      able.value = true
      seconds.value = 20
      clearInterval(timer)
    }
  }, 1000)
})

const toExam = () => {
  router.push('/layout/exam')
}
</script>

<style scoped lang="scss">
.notice-wrap {
  display: flex;

  .left {
    width: 200px;
  }

  .right {
    flex: 1;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;

    .title {
      font-size: 18px;
      font-weight: bold;
      height: 40px;
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
    }

    .el-card {
      width: 55%;
      position: relative;
      left: -50px;

      .el-button {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>