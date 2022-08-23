import request from "@/utils/request";

const api = {
  Login: "/api/user/login",
  GetCaptcha: "/api/user/captcha",
};

export function login(param) {
  return request(api.Login, {
    method: "post",
    data: param,
  });
}

export function getCaptcha() {
  return request(api.GetCaptcha);
}
