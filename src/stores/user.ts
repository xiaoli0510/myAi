import { IResUserInfo } from "@/apis/model/user";
import { apiLogin, apiUserInfo } from "@/apis/user";
import { useLocalCache } from "@/hooks/useLocalCache";
import { defineStore } from "pinia";
import { ref } from "vue";
const { setCache, removeCache } = useLocalCache();

export const useUserStore = defineStore("user", () => {
  const login = (payload) => {
    //去登录
    return apiLogin(payload)
      .then((res) => {
        const { code, Token } = res.data;
        if (code === 200) {
          setCache("token", Token);
          return Promise.resolve();
        }
      })
      .then(() => {
        getUserInfo();
      });
  };

  const userInfo = ref<IResUserInfo | null>();
  const getUserInfo = () => {
    apiUserInfo().then((res) => {
      userInfo.value = res.data.body;
    });
  };

  const logout = () => {
    removeCache("token");
  };
  return {
    login,
    userInfo,
    getUserInfo,
    logout,
  };
});
