<template>
  <main class="main">
    <UsersTable />
  </main>
</template>

<script lang="ts">
import UsersTable from "@/components/UsersTable/UsersTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainView",
  components: { UsersTable },
});
</script>

<style scoped lang="scss">
.main {
  background-color: rgb(229, 229, 229);
  min-height: calc(100vh - 81px);
}
</style>
