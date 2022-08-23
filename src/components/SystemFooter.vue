<template>
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
</template>

<script>
export default {
  name: "SystemFooter",
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 80px;
  width: 305px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .links {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
  .copyright {
    margin-top: 21px;
  }
}
</style>>