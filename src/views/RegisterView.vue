<template>
  <div class="body">
    <div class="header">
      <SystemIntro></SystemIntro>
    </div>
    <div class="main">
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item>
          <h2>注册</h2>
        </el-form-item>
        <el-form-item prop="accountName">
          <el-input
            v-model="formData.accountName"
            placeholder="用户名"
            prop="accountName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            showpassword
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input
            v-model="formData.passwordAgain"
            placeholder="请输入确认密码"
            type="password"
            showpassword
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item id="verify-code" prop="emailCode">
          <div id="verify-code">
            <el-input
              class="code-input"
              v-model="formData.emailCode"
              placeholder="验证码"
            ></el-input>

            <el-button
              class="code-button"
              @click="getEmailCode"
              :disabled="lockBtn"
              >{{ codeBtn }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <div class="submit">
            <el-button type="primary" @click="register()">注册</el-button>
            <el-link type="primary" href="/login">使用已有账号登录</el-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <SystemFooter></SystemFooter>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import * as registerApi from "@/api/register.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import SystemIntro from "@/components/SystemIntro.vue";
import SystemFooter from "@/components/SystemFooter.vue";

export default {
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const formData = reactive({
      accountName: "",
      password: "",
      passwordAgain: "",
      email: "",
      emailCode: "",
    });
    let codeBtn = ref("获取验证码");
    const rules = {
      accountName: {
        required: true,
        message: "只允许字母和数字的组合",
        trigger: "blur",
        pattern: /^[0-9a-z]+$/i,
      },
      password: {
        required: true,
        message: "必须是大于6个字符的字母和数字的组合",
        trigger: "blur",
        validator: (rule, value) => {
          return (
            value.length > 6 && /[a-z]+/i.test(value) && /[0-9]+/.test(value)
          );
        },
      },
      passwordAgain: {
        required: true,
        message: "两次输入的密码不相同",
        trigger: "blur",
        validator: (rule, value) => value === formData.password,
      },
      email: {
        required: true,
        message: "邮箱不合法",
        trigger: "blur",
        type: "email",
      },
      emailCode: {
        required: true,
        message: "请输6位入数字验证码",
        trigger: "blur",
        pattern: /^[0-9]{6,}$/,
      },
    };
    const lockBtn = ref(false);
    const getEmailCode = () => {
      // 需要校验验证码是否被填写

      // 如果邮箱为空，则提示需要填写邮箱
      if (!formData.email) {
        ElMessage({ message: "请先填写邮箱" });
        return;
      }

      // 倒计时
      if (!lockBtn.value) {
        // 调用后端接口获取邮箱验证码
        registerApi.getEmailCode({
          email: formData.email,
        });
        lockBtn.value = !lockBtn.value;
        let seconds = 60;
        const countDown = setInterval(() => {
          if (seconds > 0) {
            codeBtn.value = seconds;
            seconds -= 1;
          } else {
            clearInterval(countDown);
            lockBtn.value = !lockBtn.value;
            codeBtn.value = "获取验证码";
          }
        }, 1000);
      }
    };
    const register = () => {
      // 将表单数据提交到后台，如果成功则跳转到登录页，失败则提示
      // 检测所有表单必填项
      formRef.value.validate((valid) => {
        if (!valid) return;
        registerApi
          .submitRegisterForm({
            accountName: formData.accountName,
            password: formData.password,
            passwordAgain: formData.passwordAgain,
            email: formData.email,
            emailCode: formData.emailCode,
          })
          .then(() => {
            ElMessage({ message: "注册成功", type: "success" });
            router.push("/login");
          });
      });
    };
    return {
      formData,
      rules,
      codeBtn,
      lockBtn,
      formRef,
      getEmailCode,
      register,
    };
  },
  components: { SystemIntro, SystemFooter },
};
</script>

<style lang="scss" scoped>
.body {
  height: 100vh;
  overflow: auto;
  background: rgba(224, 234, 255, 0.4);
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main {
  margin-top: 80px;
  width: 305px;
  height: 460px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div {
    width: 100%;
  }
  h2 {
    display: flex;
    align-self: flex-start;
  }
  #verify-code {
    display: flex;
    justify-content: space-between;
    .code-input {
      width: 50%;
    }
    button {
      min-width: 30%;
    }
  }
  .submit {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: 117px;
    }
  }
}
</style>
