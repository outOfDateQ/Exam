import { defineStore } from 'pinia'

const useOtherStore = defineStore('other', {
  state: () => ({
    // 标记是否已经进了理论考试
    flag: false,
    // 标记全部测试是否做完
    allDone: false,
    // 存储随机获取到的一百道题
    currentTest: [],
    // 存储随机获取到的十道题
    current10Test: [],
    // 当前做了那些题的数组
    hasDone: [],
    // 理论考试的随机最终分数
    theoryGrade: 0,
    // 标记当前进入的哪一个考试
    testFlag: 0, // 0综合, 1理论
    // 当前考试的标题
    testTitle: 'AOPA理论考试系统',
    // 记录当前考了几次了
    allTest: 0,
    // 综合考试的题目标题
    titleNum: ['一', '', '二', '', '三', '', '四', '', '五', '']
  }),

  actions: {},

  getters: {}
})

export default useOtherStore