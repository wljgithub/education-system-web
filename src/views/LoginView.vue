<template>
  <div class="body">
    <div class="header">
      <SystemIntro></SystemIntro>
    </div>
    <div class="main">
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item>
          <h2>登录</h2>
        </el-form-item>
        <el-form-item prop="accountName">
          <el-input
            v-model="formData.accountName"
            placeholder="请输入用户名"
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
        <el-form-item id="verify-code" prop="imageCode">
          <div id="verify-code">
            <el-input
              class="code-input"
              v-model="formData.imageCode"
              placeholder="验证码"
            ></el-input>

            <img :src="imageUrl" @click="getImageCode" alt="图片验证码" />
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <!-- <div class="submit"> -->
          <el-button type="primary" @click="login">登录</el-button>
          <!-- </div> -->
        </el-form-item>
        <el-form-item>
          <div class="register-link">
            <el-link type="primary" href="/register">注册账号</el-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <SystemFooter></SystemFooter>
    </div>
  </div>
</template>

<script >
import SystemIntro from "@/components/SystemIntro";
import SystemFooter from "@/components/SystemFooter.vue";
import { reactive, ref } from "vue";
import { getCaptcha, login as loginApi } from "@/api/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default {
  components: {
    SystemIntro,
    SystemFooter,
  },
  setup() {
    const formData = reactive({
      accountName: "",
      password: "",
      imageCode: undefined,
    });
    const formRef = ref(null);
    const imageUrl = ref("");
    const router = useRouter();
    const rules = {
      imageCode: {
        required: true,
        message: "请输4位入数字验证码",
        trigger: "blur",
        pattern: /^[0-9]{4}$/,
      },
      accountName: {
        required: true,
        message: "请输入用户名",
        trigger: "blur",
      },
      password: {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
    };

    // 页面初始化时去后端拉取图片验证码，并且渲染的页面上
    getCaptcha().then((res) => {
      // 把图片渲染到页面上
      imageUrl.value = res.data.captcha;
    });

    const getImageCode = () => {
      // 点击图形验证码会刷新，并且登录失败也会刷新

      // 调用接口从后端获取验证码图片
      getCaptcha().then((res) => {
        // 把图片渲染到页面上
        imageUrl.value = res.data.captcha;
      });
    };
    const login = () => {
      // 登录之前，要填写所有的必填项
      formRef.value.validate((valid) => {
        if (!valid) return;
        // 将表单数据提交到后端
        loginApi({
          accountName: formData.accountName,
          password: formData.password,
          captcha: formData.imageCode,
        })
          .then(() => {
            // 如果成功提示登录成功,跳转到首页（/dashboard）
            ElMessage({ message: "登录成功", type: "success" });
            router.push("/dashboard");
          })
          .catch(() => {
            getCaptcha().then((res) => {
              // 把图片渲染到页面上
              imageUrl.value = res.data.captcha;
            });
          });
      });
    };
    return {
      formData,
      formRef,
      imageUrl,
      rules,
      getImageCode,
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
.body {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    margin-top: 125px;
    width: 305px;
    height: 460px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-form-item {
      margin-bottom: 30px !important;
    }
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
      img {
        min-width: 30%;
        max-height: 32px;
        max-width: 40%;
      }
    }
    .submit button {
      width: 100%;
    }
    .register-link {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>