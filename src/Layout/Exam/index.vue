<template>
  <div class="exam-wrap">
    <div class="left">
      <ListItem @click="choose(index)" v-for="(item, index) in list" :key="index" :currentIdx="currentIdx" :content="item"
        :index="index" />
    </div>
    <div class="right">
      <el-table :data="listData" border :header-cell-style="{ backgroundColor: '#F0F4F7' }">
        <el-table-column align="center">
          <!-- 表头 -->
          <template #header>
            <div class="header">
              <el-icon>
                <Operation />
              </el-icon>
              <span>考试名称</span>
            </div>
          </template>
          <!-- 内容 -->
          <template #default="{ row, $index }">
            <span>{{ row.testName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150">
          <template #header>
            <div class="header">
              <el-icon>
                <DataAnalysis />
              </el-icon>
              <span>考试时间</span>
            </div>
          </template>

          <template #default="{ row }">
            <span>{{ row.dayTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150">
          <template #header>
            <div class="header">
              <el-icon>
                <Timer />
              </el-icon>
              <span>考试时长</span>
            </div>
          </template>

          <template #default="{ row }">
            <span>{{ row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150">
          <template #header>
            <div class="header">
              <el-icon>
                <Timer />
              </el-icon>
              <span>剩余时长</span>
            </div>
          </template>

          <template #default="{ row }">
            <span>{{ row.restTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150">
          <template #header>
            <div class="header">
              <el-icon>
                <Edit />
              </el-icon>
              <span>操作</span>
            </div>
          </template>

          <template #default="{ row, $index }">
            <el-button :disabled="$index === 0 && otherStore.allTest === 0" type="primary" size="small"
              @click="startTest(row)">{{ row.start }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListItem from '@/Layout/Exam/ListItem/index.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useOtherStore from '@/store/modules/other'

const router = useRouter()
const otherStore = useOtherStore()

const currentIdx = ref(0)

const list = reactive([
  '我的考试', '成绩列表'
])

const date = new Date()

let listData = reactive([
  {
    testName: '多旋翼，超视距驾驶员，综合问答，Ⅲ',
    // @ts-ignore
    dayTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    time: '20分钟',
    restTime: '20分钟',
    start: '开始考试'
  },
  {
    testName: '多旋翼，超视距驾驶员，理论考试，通用',
    // @ts-ignore
    dayTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    time: '120分钟',
    restTime: '120分钟',
    start: '开始考试'
  }
])

onMounted(() => {
  if (otherStore.allTest === 1) {
    console.log(1);
    listData.splice(1, 1)
  } else if (otherStore.allTest === 2) {
    listData.splice(0, 2)
  }
})


const choose = (idx: number) => {
  currentIdx.value = idx
}

const startTest = (row: any) => {
  // if (!otherStore.flag) {
  if (parseInt(row.time) === 20) {
    if (!otherStore.flag) {
      ElMessage({
        type: 'warning',
        message: '请先完成理论考试'
      })
    } else {
      if (otherStore.allDone) {
        ElMessage({
          type: 'success',
          message: '综合问答已完成'
        })
        return
      }
      otherStore.allDone = true
      otherStore.hasDone = []
      router.push({
        path: '/layout/theory',
        query: {
          allTime: 1200,
          id: 0,
          // @ts-ignore
          isUp: true
        }
      })
      otherStore.testTitle = '多旋翼，超视距驾驶员，综合问答(试卷总分10.0分;合格分数7.0分)'
      otherStore.testFlag = 0
      otherStore.allTest += 1
    }
  } else {
    if (otherStore.flag) {
      ElMessage({
        type: 'success',
        message: '理论考试已完成'
      })
    } else {
      otherStore.flag = true
      otherStore.hasDone = []
      router.push({
        path: '/layout/theory',
        query: {
          allTime: 7200,
          id: 1,
          // @ts-ignore
          isUp: false
        }
      })
      otherStore.testTitle = '多旋翼，超视距驾驶员，理论(试卷总分100.0分;合格分数70.0分)'
      otherStore.testFlag = 1
      otherStore.allTest += 1
    }
  }
}
</script>

<style lang="scss" scoped>
.exam-wrap {
  display: flex;

  .left {
    width: 200px;
  }

  .right {
    flex: 1;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;

    .el-table {
      width: 95%;

      :deep .el-table__body-wrapper {
        // display: none;
      }
    }

    .header {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        margin-left: 6px;
      }
    }
  }
}
</style>