import { useLocalStorage } from "@vueuse/core";

const defCache = {
  token: "",
};

export function useLocalCache() {
  //获取
  const getCache = (key) => {
    return useLocalStorage(key, defCache[key]).value;
  };

  //设置
  const setCache = (key = "token", value) => {
    useLocalStorage(key, defCache[key]).value = value;
  };

  const removeCache = (key = "token") => {
    useLocalStorage(key, defCache[key]).value = null;
  };

  return {
    getCache,
    setCache,
    removeCache,
  };
}
