<template>
  <AppHeader />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/Header/AppHeader.vue";

export default defineComponent({
  name: "App",
  components: { AppHeader },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  scrollbar-color: rebeccapurple, #000;
  scrollbar-width: thin;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #000;
}

::-webkit-scrollbar-thumb {
  background-color: rebeccapurple;
  border-radius: 10px;
  border: 3px solid black;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #3f5f5f;
}
</style>
