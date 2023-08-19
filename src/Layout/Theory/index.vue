<template>
  <div class="theory-wrap">
    <div class="left">
      <el-card style="width:350px;">
        <p>红色题号代表未作答题目</p>
        <p>绿色题号代表已作答题目</p>
        <p style="display: flex;align-items: center;">
          <el-icon color="red">
            <Flag />
          </el-icon>
          <span>代表标记过的题目</span>
        </p>
        <div class="test-number">
          <span>题目：</span>
          <div class="count-wrap">
            <template v-if="otherStore.testFlag === 1">
              <CountItem @click="chooseTest(item, index)" v-for="(item, index) in otherStore.currentTest" :key="index"
                :idx="index" />
            </template>
            <template v-else>
              <CountItem @click="chooseTest(item, index)" v-for="(item, index) in otherStore.current10Test" :key="index"
                :idx="index" />
            </template>
          </div>
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card shadow="never" class="wrap-card">
        <div class="top">
          <h1 style="font-size: 20px;">一.单选题(每题1.0分)</h1>

        </div>

        <!-- <el-scrollbar ref="scroll"> -->
        <div class="bottom">
          <div class="el-scrollbar">
            <template v-if="otherStore.testFlag === 1">
              <TestItem v-for="(item, index) in otherStore.currentTest" :key="index" :test="item" :idx="index" />
            </template>
            <template v-else>
              <TestItem v-for="(item, index) in otherStore.current10Test" :key="index" :test="item" :idx="index" />
            </template>
          </div>

          <div class="time">
            <p style="line-height: 20px;">答题时间：
              <template v-if="otherStore.testFlag === 0">
                <span v-if="minute">{{ minute }}分钟{{ seconds }}秒/</span>
                <span v-else>20分钟/</span>
              </template>
              <template v-else>
                <span v-if="minute">{{ minute }}分钟{{ seconds }}秒/</span>
                <span v-else>120分钟/</span>
              </template>
              <span style="font-weight:bold;">
                {{ filterAllTime }}
              </span><span style="line-height: 20px;">分钟(时间到达后自动提交试卷，</span>
            <p style="line-height: 30px;">请注意答题时间)</p>
            </p>
            <el-button type="primary" size="default" @click="submit">
              提交试卷
            </el-button>
          </div>
        </div>
        <!-- </el-scrollbar> -->
      </el-card>
    </div>

    <!-- 提示用户是否提交的模态框 -->
    <el-dialog v-model="dialogVisible" title="确认提交" width="40%">
      <span>提交后将不可修改</span>
      <template #footer>
        <el-button type="default" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="ensureSubmit">确定</el-button>
      </template>
    </el-dialog>

    <!-- 结果模态框 -->
    <Model :flag="flag" />
  </div>
</template>

<script setup lang="ts">
import CountItem from './CountItem/index.vue'
import TestItem from './TestItem/index.vue'
import Model from '@/components/Model/index.vue'
import useTheoryStore from '@/store/modules/theory'
import useCompositeStore from '@/store/modules/composite'
import useOtherStore from '@/store/modules/other'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// defineProps(['isUp'])

const route = useRoute()

const scroll = ref<any>()
// const currentTest = ref<any>([]) // 用于存储当前随机出来的一百到题目
const otherStore = useOtherStore()
const theoryStore = useTheoryStore()
const compositeStore = useCompositeStore()
const tempAllTest = JSON.parse(JSON.stringify(theoryStore.filterData))
const tempAll10Test = JSON.parse(JSON.stringify(compositeStore.data))

const dialogVisible = ref(false)

// 存储一百道题的索引的数组
const save100Index = ref([])
// 存储十道题的索引的数组
const save10Index = ref([])

let allTime = ref<any>()
// @ts-ignore 
if (route.query.id === 0) {
  allTime.value = route.query.allTime // 秒
} else {
  allTime.value = route.query.allTime // 秒
}

// 分钟
const minute = ref<any>()
// 秒
const seconds = ref<any>()

const flag = ref(false)

let timer: any

// 倒计时的函数
const countDown = () => {
  timer = setInterval(() => {
    // @ts-ignore
    allTime.value -= 1
    // @ts-ignore
    minute.value = parseInt(allTime.value / 60)
    // @ts-ignore
    seconds.value = parseInt(allTime.value % 60)

    // @ts-ignore
    if (allTime.value < 0) {
      // @ts-ignore 
      if (route.query.id === 0) {
        allTime.value = route.query.allTime
      } else {
        allTime.value = route.query.allTime
      }
      clearInterval(timer)
      // 强制交卷...
      ensureSubmit()
    }
  }, 1000)
}

onMounted(() => {
  countDown()
})

const filterAllTime = computed(() => {
  // @ts-ignore
  if (route.query.id === 0) {
    // @ts-ignore
    return route.query.allTime / 60
  } else {
    // @ts-ignore
    return route.query.allTime / 60
  }
})

// #region 得到理论考试的数据
// 获取0-100之间的随机数
const getRandomNumber = () => {
  return Math.floor(Math.random() * 101) // 0-100
}

// 获取随机一百道题
const get100Test = () => {
  for (let i = 0; i < 100; i++) {
    if (!otherStore.currentTest.some((item: any) => item.id === tempAllTest[getRandomNumber()].id) && otherStore.currentTest.length < 100) {
      // @ts-ignore
      otherStore.currentTest.push(tempAllTest[getRandomNumber()])
    }
  }

  otherStore.currentTest = [...new Set(otherStore.currentTest)]

  if (otherStore.currentTest.length < 100) {
    // otherStore.currentTest.forEach(item => {

    // })
    get100Test()
  }
}
// #endregion

// #region 得到理论考试的数据
// 获取0-10之间的随机数
const getRandomNumber2 = () => {
  return Math.floor(Math.random() * 11) // 0-10
}

// 获取随机十道题
const get10Test = () => {
  for (let i = 0; i < 10; i++) {
    if (!otherStore.current10Test.some((item: any) => item.id === tempAll10Test[getRandomNumber2()].id) && otherStore.current10Test.length < 10) {
      // @ts-ignore
      otherStore.current10Test.push(tempAll10Test[getRandomNumber2()])
    }
  }

  otherStore.current10Test = [...new Set(otherStore.current10Test)]

  if (otherStore.current10Test.length < 10) {
    get10Test()
  }
}
// #endregion

// @ts-ignore
if (otherStore.testFlag === 0) {
  // console.log(123)
  get10Test()
} else {
  // console.log(13)
  get100Test()
}

// 选择左侧题目
const chooseTest = (item: any, idx: number) => {

}

const submit = () => {
  dialogVisible.value = true
}

// 获取理论的最终分数80-100之间
const getFianlGrade = () => {
  return Math.floor(Math.random() * (100 - 80 + 1)) + 80
}

// 获取综合的最终分数8-10之间
const getFianlGrade2 = () => {
  return Math.floor(Math.random() * (10 - 8 + 1)) + 8
}

const ensureSubmit = () => {
  clearInterval(timer)
  // @ts-ignore
  if (route.query.id === 0) {
    allTime.value = route.query.allTime
  } else {
    allTime.value = route.query.allTime
  }
  // @ts-ignore
  minute.value = null
  // @ts-ignore
  seconds.value = null
  dialogVisible.value = false

  // 得到最终的得分
  // @ts-ignore
  if (otherStore.testFlag === 0) {
    otherStore.theoryGrade = getFianlGrade2()
  } else {
    otherStore.theoryGrade = getFianlGrade()
  }
  flag.value = true
}
</script>

<style lang="scss" scoped>
.theory-wrap {
  display: flex;
  padding: 10px;
  height: calc(100vh - 100px);

  .left {
    overflow-y: scroll;
    overflow-x: hidden;

    .el-card {
      border-radius: 0;

      p {
        line-height: 30px;
      }

      .test-number {
        span {
          display: block;
          font-weight: bold;
          margin: 30px 0 20px 0;
        }

        .count-wrap {
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
        }
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .wrap-card {
      width: 99%;
      border-radius: 0;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;

      :deep .el-card__body {
        padding: 0;
      }


      .top {
        display: flex;
        justify-content: space-between;
        height: 30px;
        margin-bottom: 20px;
        // border-bottom: 1px solid #eee;


      }


      .bottom {
        height: calc((100vh - 20px) - 200px);

        .time {
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #dbecff;
          padding-left: 80px;
          width: 99.5%;

          .el-button {
            margin-left: 20px;
            border-radius: 0;
            background-color: #34C6CF;
            height: 35px;
            // display: flex;
            // justify-content: center;
            // // align-items: center;
            font-size: 16px;
            align-self: flex-start;
          }
        }

        .el-card {
          padding: 20px;
        }

        .el-scrollbar {
          // flex: 1;
          overflow-y: scroll;
          overflow-x: hidden;
        }
      }


    }
  }

}
</style>