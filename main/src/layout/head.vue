<template>
  <div class="main-headtop">
    <div class="left">
      <div class="logo">
        <span class="title">聚合应用</span>
      </div>
      <el-menu
        :default-active="defaultIndex"
        active-text-color="#fff"
        background-color="#407aff"
        mode="horizontal"
        @select="changeRoute"
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/vue3">Vue3子应用</el-menu-item>
        <el-menu-item index="/vue2">Vue2子应用</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import { menuDataList } from '@/views/basic/menulistData.js'
export default {
  name: 'headTop',
  data() {
    return {
      defaultIndex: '',
      isLocal: process.env.NODE_ENV === 'development',
      hasServicePermission: true,
      hasCrmPermission: true,
      hasTicketPermission: true,
      hasChatbotPermission: false // chatbot平台 权限
    }
  },
  mounted() {
    this.defaultIndex = this.$route.path ? this.$route.path : ''
  },
  computed: {
    // ...mapState(['USER_INFO', 'MENU_LIST_PERMISSON'])
  },
  methods: {
    changeRoute(e) {
      window.history.pushState({}, '', e)
    }
  },
  components: {},
  watch: {
    '$route.path': function () {
      this.defaultIndex = this.$route.path ? this.$route.path : ''
    }
  }
}
</script>
<style lang="scss" scoped>
.marginr {
  margin-right: 10px;
}
.main-headtop {
  width: 100%;
  height: 72px;
  background: #407aff;
  border-radius: 1px;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    width: 80%;
  }
  .logo {
    display: flex;
    align-items: center;
    margin-left: 15px;
    margin-right: 20px;
    .logoimg {
      width: 129px;
      margin-right: 20px;
    }
    .title {
      font-size: 22px;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 2px;
      white-space: nowrap;
      width: auto;
    }
  }
  .userinfo {
    display: flex;
    align-items: center;
    .el-avatar {
      width: 24px;
      height: 24px;
    }
    .el-dropdown,
    .el-dropdown-link {
      font-size: 14px;
      font-weight: 400;
      color: #ffffff !important;
    }
  }
}
.el-menu {
  background-color: transparent;
  width: auto;
  width: calc(100% - 200px);
}
.el-menu--horizontal {
  padding-left: 30px;
  border-bottom: none !important;
}

.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 55px !important;
  line-height: 55px !important;
  font-weight: 500;
  margin: 0;
  font-size: 16px;
  border-bottom: 2px solid transparent;
  color: #fff;
  padding: 0 7px;
  margin: 0 20px;
  &:hover {
    border-bottom: 2px solid #fff !important;
    color: #fff !important;
    background: #407aff !important;
    background-color: #407aff !important;
  }
}
.el-menu-item.is-active {
  background: #407aff !important;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #fff;
  color: #fff;
  &:link,
  &:visited {
    background: #407aff !important;
    color: red;
  }
}
</style>
