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
      <div class="desc"><h2>注册</h2></div>
      <div>
        <el-input v-model="accountName" placeholder="用户名"></el-input>
      </div>
      <div>
        <el-input
          v-model="password"
          placeholder="请输入密码"
          type="password"
          showpassword
        ></el-input>
      </div>
      <div>
        <el-input
          v-model="passwordAgain"
          placeholder="请输入确认密码"
          type="password"
          showpassword
        ></el-input>
      </div>
      <div>
        <el-input v-model="email" placeholder="请输入邮箱"></el-input>
      </div>
      <div id="verify-code">
        <el-input
          class="code-input"
          v-model="verifyCode"
          placeholder="验证码"
        ></el-input>
        <el-button class="code-button">获取验证码</el-button>
      </div>
      <div class="submit">
        <el-button type="primary">注册</el-button>
        <el-link type="primary">使用已有账号登录</el-link>
      </div>
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
export default {};
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
    :code-button {
      width: 30%;
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