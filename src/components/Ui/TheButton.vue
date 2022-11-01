<template>
  <div class="button-wrapper">
    <button v-bind="$attrs" @click="$emit('onClick')">
      <slot>Button</slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheButton",
  inheritAttrs: false,
});
</script>

<style scoped lang="scss">
.button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  & button {
    padding: 12px 8px;
    min-width: 120px;
    outline: none;
    border: none;
    background-color: rgba(12, 11, 11, 0.705);
    box-shadow: 3px 3px 7px #000;
    color: #fff;
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: none;
      cursor: pointer;
    }
  }
}
</style>
