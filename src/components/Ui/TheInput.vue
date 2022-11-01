<template>
  <div class="input-wrapper">
    <label v-if="label">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />

    <slot name="notifications"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
    },
  },
});
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding: 10px;
  position: relative;
  & input {
    padding: 12px 8px;
    &:focus {
      outline-color: rgba(12, 11, 11, 0.705);
      outline-style: groove;
      outline-width: 2px;
    }
  }
  & label {
    color: #fff;
  }
}
</style>
