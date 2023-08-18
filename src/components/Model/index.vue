<template>
  <!-- 显示用户得分的模态框 -->
  <el-dialog :model-value="flag" width="40%" :show-close="false" :close-on-click-modal="false">
    <p>您本次考试结果为：通过</p>
    <p>本次考试得分为：{{ otherStore.theoryGrade }}</p>
    <p>请点击<span class="link" @click="navigateBack">返回考试列表</span>进行其余考试</p>
  </el-dialog>
</template>

<script setup lang="ts">
import useOtherStore from '@/store/modules/other'
import { useRouter } from 'vue-router'

const otherStore = useOtherStore()
const router = useRouter()

defineProps(['flag'])

const navigateBack = () => {
  router.push('/layout/exam')
  otherStore.testTitle = 'AOPA理论考试系统'
}
</script>

<style scoped lang="scss">
.el-dialog {
  p {
    line-height: 30px;
  }
}

.link {
  font-size: 22px;
  color: #75bae2;
  cursor: pointer;
}
</style>