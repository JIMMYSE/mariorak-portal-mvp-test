export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<any | null>(null);

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
