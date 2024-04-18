import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null);

    return {
      user,
      getUser() {
        return user;
      },
      setUser(val: any) {
        user.value = val;
      },
      clearUser() {
        user.value = null;
      },
    };
  },
  {
    persist: true,
  }
);
