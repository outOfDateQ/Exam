<template>
  <el-card style="width:100%;margin-bottom:20px;">
    <div class="title">
      <el-icon @click.stop="playTag($event, idx)" :class="{ active: idx === currentIdx && isTag }" color="#aaa"
        style="cursor:pointer;">
        <Flag />
      </el-icon>
      <span style="line-height:25px;margin-left:20px;">
        {{ idx + 1 }}.{{ test.title }}
      </span>
    </div>
    <el-radio-group v-model="res" class="ml-4">
      <el-radio label="A" size="large" @click.stop="handleTest(idx)">
        {{ test.A }}
      </el-radio>
      <el-radio label="B" size="large" @click.stop="handleTest(idx)">
        {{ test.A }}
      </el-radio>
      <el-radio label="C" size="large" @click.stop="handleTest(idx)">
        {{ test.B }}
      </el-radio>
    </el-radio-group>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useOtherStore from '@/store/modules/other'

const otherStore = useOtherStore()

defineProps(['test', 'idx'])

const res = ref<any>()

const currentIdx = ref<any>()
const isTag = ref(false)

// 完成一个题目
const handleTest = (idx: number) => {
  if (!otherStore.hasDone.some(item => item === idx)) {
    // @ts-ignore
    otherStore.hasDone.push(idx)
  }
}


const playTag = (ev: any, idx: number) => {
  if (currentIdx.value === idx && isTag.value) {
    isTag.value = false
    return
  }
  isTag.value = true
  currentIdx.value = idx
}
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  // height: 50px;
  // line-height: 50px;
  border-bottom: 1px solid #eee;
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 5px;

  .el-icon {
    position: absolute;
    top: 5px;

    &.active {
      color: red;
    }
  }
}

.el-radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .el-radio {
    // transform: scale(1.1);
  }

  :deep .el-radio__input.is-checked .el-radio__inner::after {
    content: "";
    width: 8px;
    height: 5px;
    border: 2px solid white;
    border-top: transparent;
    border-right: transparent;
    text-align: center;
    display: inline-block;
    position: absolute;
    top: 2px;
    left: 2px;
    vertical-align: middle;
    transform: rotate(-45deg);
    border-radius: 0px;
    background: none;
  }
}
</style>