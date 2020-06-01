<template>
  <el-container>
    <el-aside :width="isSlide ? '20px' : '200px'">
        <el-menu
          background-color="#323745"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isSlide"
        >
            <el-menu-item index="1" :style="{width: isSlide ? '20px' : '200px'}">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2" :style="{width: isSlide ? '20px' : '200px'}">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>内容管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">发布文章</el-menu-item>
                    <el-menu-item index="2-2">文章列表</el-menu-item>
                    <el-menu-item index="2-3">评论列表</el-menu-item>
                    <el-menu-item index="2-4">素材管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" :style="{width: isSlide ? '20px' : '200px'}">
                <i class="el-icon-location"></i>
                <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="4" :style="{width: isSlide ? '20px' : '200px'}">
                <i class="el-icon-location"></i>
                <span slot="title">账户信息</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <span @click="isSlide = !isSlide">大头下雨不愁系统</span>
        </div>
        <div id="rt">
          <el-input placeholder="请输入搜索内容" style="width: 240px" type="text"></el-input>
          <span class="message">消息</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="photo" alt />
              <span>{{phone}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>git地址</el-dropdown-item>
              <el-dropdown-item @click.native="quitFn">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main> 
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      photo: "",    //用户头像
      phone: "",    //用户手机号
      isSlide: false //左侧导航是否折叠
    };
  },
  mounted() {
    // 用户基本信息
    let userinfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.photo = userinfo.photo;
    this.phone = userinfo.name;
  },
  methods: {
    // 退出登录函数
    quitFn() {
        // 清空缓存-并导航到登录页面
        this.$message({
          message: '退出成功',
          type: 'success',
          onClose: () =>{
            window.sessionStorage.removeItem('userInfo');
            this.$router.push('/login');
          }
        });
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: rgb(50, 55, 69);
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    #lt {
      width: 30%;
      display: flex;
      align-items: center;
      font-size: 22px;
      font-weight: bold;
      span{
        cursor: pointer;
      }
    }
    #rt {
      width: 40%;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-weight: bold;
          margin-left: 10px;
        }
      }
      .message {
        margin: 0 20px;
      }
      img {
        width: 34px;
        height: 34px;
        border-radius: 20px;
      }
    }
  }
  .el-main {
    background-color: rgb(50, 135, 69);
  }
}
</style>
