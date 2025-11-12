import service from "@/utils/request";

export const apiLogin = (params) => {
  return service.post("/api/user/login", {
    params,
  });
};

export const apiUserInfo = () => {
  return service.post("/api/user/info");
};

export const apiRegister = (params) => {
  return service.post("/api/user/register", {
    params,
  });
};
