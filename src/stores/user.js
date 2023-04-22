import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref("");

  const getUser = () => {
    return localStorage.getItem("user") || user.value;
  };

  const setUser = (newUser) => {
    localStorage.setItem("user", newUser.value);
    user.value = newUser.value;
  };

  return { user, setUser, getUser };
});
