import service from "@/utils/request";

//获取所有的作品
export const apiCreation = () => {
  return service.post("/api/output/creation");
};
