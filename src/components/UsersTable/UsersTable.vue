<template>
  <div class="table-wrapper">
    <!-- FORM -->
    <form class="table-form" @submit.prevent="handleSubmitForm">
      <div class="controls">
        <!-- INPUT NAME -->
        <TheInput
          type="text"
          placeholder="Full Name"
          name="name"
          v-model="userName"
          label="Full Name"
          @blur="v$.userName.$touch"
        >
          <template #notifications v-if="v$.userName.$error && userName">
            <div class="slot-content">
              <strong>
                The Full Name must be in the format: FirstName LastName. <br />
                Name and Surname cannot contain less than 2 characters
              </strong>
            </div>
          </template>
        </TheInput>
        <!-- INPUT EMAIL -->
        <TheInput
          type="email"
          placeholder="Email"
          name="email"
          v-model="userEmail"
          label="Email"
          @blur="v$.userEmail.$touch"
        >
          <template #notifications v-if="v$.userEmail.$error && userEmail">
            <div class="slot-content">
              <strong>Value is not a valid email address</strong>
            </div>
          </template>
        </TheInput>
        <!-- INPUT PHONE -->
        <TheInput
          type="text"
          v-mask="phoneMask"
          placeholder="Phone"
          name="phone"
          label="Phone"
          v-model="userPhone"
          @blur="v$.userPhone.$touch"
        >
          <template #notifications v-if="v$.userPhone.$error && userPhone">
            <div class="slot-content">
              <strong
                >The phone number must be in the format: + 375 (XX)
                XXX-XX-XX.</strong
              >
            </div>
          </template>
        </TheInput>
        <!-- BUTTON SUBMIT -->
        <TheButton type="submit"> Add </TheButton>
      </div>
    </form>

    <!-- control buttons & search -->
    <div class="controls">
      <!-- BUTTON DELETE USER -->
      <TheButton :onClick="deleteUsers"> Delete </TheButton>
      <!-- CURRENT USERS COUNT -->
      <div class="users-count">
        <p>users count: {{ GET_SORTED_USERS.length }}</p>
      </div>
      <!-- INPUT SEARCH -->
      <TheInput type="search" placeholder="Search" v-model="userSearch" />
    </div>
    <!-- TABLE -->
    <table class="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              class="checkAll"
              @change="selectAllUsers"
              :checked="isAllUsersChecked"
            />
          </th>
          <th class="sorted" @click="TOGGLE_SORT_FLAG()">Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <!-- USERS -->
        <tr v-for="user in GET_SORTED_USERS" :key="user.id">
          <td>
            <input type="checkbox" :value="user.id" v-model="checkedUsersId" />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
        <!-- /// -->
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import TheInput from "@/components/Ui/TheInput.vue";
import TheButton from "@/components/Ui/TheButton.vue";
import User from "@/types/User";
import { v4 as uuidv4 } from "uuid";
import { required, email, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mask } from "vue-the-mask";

export default defineComponent({
  name: "UsersTable",
  components: { TheInput, TheButton },
  directives: {
    mask: mask as any,
  },
  data() {
    return {
      userName: "" as User["name"],
      userEmail: "" as User["email"],
      userPhone: "" as User["phone"],
      isFormSubmitted: false,
      phoneRegex:
        /^[+][\s][0-9]{3}[\s][(][0-9]{2}[)][\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/,
      phoneMask: "+ ### (##) ###-##-##" as string,
      fullNameRegex: /^[a-zA-Zа-яА-Я]{2,10}[\s][a-zA-Zа-яА-Я]{2,15}$/,
      v$: useVuelidate(),
      userSearch: "" as string,
      checkedUsersId: new Set<number | string>(),
    };
  },
  validations() {
    return {
      userName: {
        required,
        maxLength: maxLength(26),

        isValidUserName: (val: string) => this.fullNameRegex.test(val),
      },
      userEmail: {
        required,
        email,
      },
      userPhone: {
        required,

        isValidPhone: (val: string) => this.phoneRegex.test(val),
      },
    };
  },
  computed: {
    ...mapGetters(["GET_ALL_USERS", "GET_SORTED_USERS"]),

    isAllUsersChecked(): boolean {
      return this.GET_SORTED_USERS.length == this.checkedUsersId.size;
    },
  },
  watch: {
    userSearch(value: string) {
      this.SET_SEARCH_TEXT(value);
    },
  },
  methods: {
    ...mapActions([
      "SET_USERS_FROM_API",
      "TOGGLE_SORT_FLAG",
      "ADD_NEW_USER",
      "SET_SEARCH_TEXT",
      "DELETE_USERS",
    ]),

    handleSubmitForm() {
      this.v$.$validate();

      if (this.v$.$invalid) {
        console.log("Form failed validation");
      } else {
        this.addNewUser();

        this.userEmail = "";
        this.userName = "";
        this.userPhone = "";
      }
    },
    addNewUser() {
      this.ADD_NEW_USER({
        id: uuidv4(),
        name: this.userName,
        email: this.userEmail,
        phone: this.userPhone,
      });
    },
    selectAllUsers() {
      if (this.isAllUsersChecked) {
        this.checkedUsersId.clear();
        return;
      }

      this.GET_SORTED_USERS.forEach((user: User) => {
        this.checkedUsersId.add(user.id);
      });
    },
    deleteUsers() {
      this.DELETE_USERS(this.checkedUsersId);
      this.checkedUsersId.clear();
    },
  },
  created() {
    this.SET_USERS_FROM_API();
  },
});
</script>

<style lang="scss" src="./UsersTable.scss"></style>
