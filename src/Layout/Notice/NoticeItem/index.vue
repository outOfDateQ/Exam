<template>
  <div :style="`width: ${width}px;`" class="item">
    <div class="txt" :style="`padding-left:${left}px;color: #99BEE0;`" v-if="!index && index !== 0">
      {{ content }}
    </div>
    <div div class=" txt"
      :style="`padding-left:${left}px;padding-top:${topDown}px;padding-bottom:${topDown}px;height:${topDown}px`"
      :class="{ 'red-color': index === 1 }" v-else>
      {{ index + 1 }}、{{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  width: Number,
  left: Number,
  content: String,
  index: {
    type: Number,
    default: ''
  },
  lineHeight: Number,
  topDown: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="scss">
.item {
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 50px;

  .txt {
    border-left: 3px solid #99BEE0;
    background-color: #F1F4F9;
    height: 70%;
    width: 100%;
    display: flex;
    align-items: center;

    &.red-color {
      color: rgb(241, 58, 58);
    }
  }
}
</style>