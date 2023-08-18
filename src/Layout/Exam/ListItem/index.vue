<template>
  <div class="list-item">
    <div class="txt" :class="{ chekced: index === currentIdx }">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps(['content', 'index', 'currentIdx'])
</script>

<style scoped lang="scss">
.list-item {
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  // margin-bottom: 10px;

  .txt {
    height: 70%;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 30px;
    border-left: 3px solid transparent;

    &.chekced {
      border-left: 3px solid #99BEE0;
      position: reactive;
      background-color: #F1F4F9;
      color: #99BEE0;
    }
  }
}
</style>