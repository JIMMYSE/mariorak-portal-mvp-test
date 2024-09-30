import { MakerWithFileType } from 'src/types/gamepack/maker-model';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<any | null>(null);
    const maker = ref<any | MakerWithFileType>(null);

    return {
      user,
      maker,
      getUser() {
        return user;
      },
      setUser(val: any) {
        user.value = val;
      },
      setMaker(val: MakerWithFileType) {
        maker.value = val;
      },
      clearUser() {
        user.value = null;
        maker.value = null;
      },
    };
  },
  {
    persist: true,
  }
);
