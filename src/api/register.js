import request from "@/utils/request";

const api = {
  GetEmailCode: "/api/user/email-code",
  SubmitRegisterForm: "/api/user/register",
};

// 获取邮箱验证码
export function getEmailCode(param) {
  return request(api.GetEmailCode,{
    method: "get",
    data: param,
  });
}

// 提交注册表单信息
export function submitRegisterForm(param) {
  return request(api.SubmitRegisterForm,{
    method: "post",
    data: param,
  });
}
