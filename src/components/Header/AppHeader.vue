<template>
  <header class="header">
    <nav class="nav">
      <div class="nav__link">
        <router-link active-class="active" to="/">Main</router-link>
      </div>

      <div class="nav__link">
        <router-link active-class="active" to="/about">Description</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppHeader",
});
</script>

<style scoped lang="scss" src="./AppHeader.scss" )></style>
