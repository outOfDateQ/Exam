<template>
  <div class="count-wrap">
    <span class="number" :class="{ active: otherStore.hasDone.includes(idx) }">
      {{ (idx as number) + 1 < 10 ? ('0' + ((idx as number) + 1)) : (idx as number) + 1 }}</span>
        <el-icon>

        </el-icon>
  </div>
</template>

<script setup lang="ts">
import useOtherStore from '@/store/modules/other'

const otherStore = useOtherStore()

defineProps({
  idx: Number
})
</script>

<style lang="scss" scoped>
.count-wrap {
  width: 30px;
  height: 30px;
  background-color: #F5F6F9;
  font-size: 13px;
  color: #bd4c58;
  margin-bottom: 8px;
  margin-left: 8px;
  cursor: default;

  .number {
    width: 100%;
    display: inline-block;
    text-align: center;
    line-height: 30px;

    &.active {
      color: #34C6CF;
    }
  }
}
</style>