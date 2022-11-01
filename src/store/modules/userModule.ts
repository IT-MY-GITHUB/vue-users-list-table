import LocalDataService from "@/Services/LocalDataService";
import QueryService from "@/Services/QueryService";
import ResponseData from "@/types/ResponseData";
import { searchFilter, sortedData } from "@/store/modules/helpersModule";
import User from "@/types/User";

export default {
  state: {
    users: [] as User[],
    sortFlag: true as boolean,
    searchingText: "" as string,
    curUsers: [] as [],
  },
  // GETTERS
  getters: {
    // GET ALL USERS
    GET_ALL_USERS(state: { users: User[] }) {
      return state.users;
    },
    // GET SORTED USERS
    GET_SORTED_USERS(state: {
      users: User[];
      sortFlag: boolean;
      searchingText: string;
    }) {
      const sortedUsers = sortedData([...state.users]);

      !state.sortFlag && sortedUsers.reverse();

      return state.searchingText
        ? searchFilter(sortedUsers, state.searchingText)
        : sortedUsers;
    },
  },
  // MUTATIONS
  mutations: {
    // SET USERS FROM API
    SET_USERS_FROM_API(state: { users: [] }, payload: []) {
      state.users = payload;
    },
    // TOGGLE SORT FLAF
    TOGGLE_SORT_FLAG(state: { sortFlag: boolean }) {
      state.sortFlag = !state.sortFlag;
    },
    // SET SEARCH TEXT
    SET_SEARCH_TEXT(state: { searchingText: string }, payload: string) {
      state.searchingText = payload;
    },
    // ADD NEW USER
    ADD_NEW_USER(state: { users: User[] }, payload: User) {
      state.users = [...state.users, payload];
      LocalDataService.setData("vue-users", state.users);
    },
    // DELETE USERS
    DELETE_USERS(state: { users: User[] }, payload: Set<number | string>) {
      if (payload.size > 0) {
        for (const id of payload) {
          state.users = [...state.users].filter((user) => user.id != id);
        }
        LocalDataService.setData("vue-users", state.users);
      }
    },
  },
  // ACTIONS
  actions: {
    // SET USERS FROM API
    async SET_USERS_FROM_API({ commit }: { commit: CallableFunction }) {
      if (
        LocalDataService.getData("vue-users") &&
        LocalDataService.getData("vue-users").length != 0
      ) {
        commit("SET_USERS_FROM_API", LocalDataService.getData("vue-users"));
      } else {
        try {
          console.log("start fetch...");

          const result: ResponseData = await QueryService.getAllData();
          console.log(result);

          commit("SET_USERS_FROM_API", result.data);
          LocalDataService.setData("vue-users", result.data);
          console.log("end fetch...");
        } catch (error) {
          console.log(error);
        }
      }
    },
    // TOGGLE SORT FLAG
    TOGGLE_SORT_FLAG({ commit }: { commit: CallableFunction }) {
      commit("TOGGLE_SORT_FLAG");
    },
    // SET SEARCH TEXT
    SET_SEARCH_TEXT({ commit }: { commit: CallableFunction }, payload: string) {
      commit("SET_SEARCH_TEXT", payload);
    },
    // ADD NEW USER
    ADD_NEW_USER({ commit }: { commit: CallableFunction }, payload: User) {
      commit("ADD_NEW_USER", payload);
    },
    // DELETE USER
    DELETE_USERS(
      { commit }: { commit: CallableFunction },
      payload: Set<number | string>
    ) {
      commit("DELETE_USERS", payload);
    },
  },
};
