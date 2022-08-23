<template>
  <div class="header">
    <div class="title">
      <img src="../assets/login-logo.svg" alt="logo" />
      <h1>教务管理系统</h1>
    </div>
    <div class="desc">
      <p>一个专注于为师生服务的管理系统</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SystemIntro",
};
</script>

<style lang="scss" scoped>
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
</style>