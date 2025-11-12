export default [
  //用户登录接口
  {
    url: "/api/user/login",
    method: "POST",
    response: (req) => {
      const { Account, Password } = req.body.params;
      if (Account === "admin@163.com" && Password === "123456") {
        return {
          data: {
            code: 200,
            message: "登录成功",
            Token:
              "eyJhbGc6IkpXVCJ9.eyJpc3MiOiJCIsImVzg5NTU0NDUiLCJuYW1lnVlfQ.SwyHTf8AqKYMAJc",
          },
        };
      }
    },
  },
  //获取用户信息接口
  {
    url: "/api/user/info",
    method: "POST",
    response: () => {
      return {
        data: {
          code: 200,
          message: "successful",
          body: {
            nickName: "admin",
            level: "2",
          },
        },
      };
    },
  },
  //用户注册接口
  {
    url: "/api/user/register",
    method: "POST",
    response: () => {
      return {
        data: {
          code: 200,
          message: "注册成功",
        },
      };
    },
  },
];
