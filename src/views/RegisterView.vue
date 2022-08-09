<template>
  <div class="body">
    <div class="header">
      <div class="title">
        <img src="../assets/login-logo.svg" alt="logo" />
        <h1>教务管理系统</h1>
      </div>
      <div class="desc">
        <p>一个专注于为师生服务的管理系统</p>
      </div>
    </div>
    <div class="main">
      <el-form :model="formData" :rules="rules">
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
              @click="getEmailCode()"
              :disabled="lockBtn"
              >{{ codeBtn }}</el-button
            >
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <div class="submit">
            <el-button type="primary" @click="register">注册</el-button>
            <el-link type="primary" href="/login">使用已有账号登录</el-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <div class="links">
        <el-link type="info">帮助</el-link>
        <el-link type="info">隐私</el-link>
        <el-link type="info">条款</el-link>
      </div>
      <div class="copyright">
        <el-link type="info">Copyright@2022</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup() {
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
      // 倒计时
      if (!lockBtn.value) {
        lockBtn.value = !lockBtn.value;
        let seconds = 5;

        const myInterval = setInterval(() => {
          if (seconds > 0) {
            codeBtn.value = seconds;
            seconds -= 1;
          } else {
            clearInterval(myInterval);
            lockBtn.value = !lockBtn.value;
            codeBtn.value = "获取验证码";
          }
        }, 1000);
      }
    };
    const register = () => {
      //TODO: 将表单数据提交到后台，如果成功则跳转到登录页，失败则提示
    };
    return {
      formData,
      rules,
      codeBtn,
      lockBtn,
      getEmailCode,
      register,
    };
  },
};
</script>

<style lang="scss">
.body {
  background: inherit;
  background: rgba(224, 234, 255, 0.4);
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  margin-top: 80px;
  width: 350px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .title {
    width: 100%;
    height: 115px;
    display: flex;
    justify-content: space-between;
  }
  .desc {
    margin-top: 30px;
  }
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
.footer {
  margin-top: 80px;
  width: 305px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .links {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
  .copyright {
    margin-top: 21px;
  }
}
</style>