<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
            <el-form-item  prop="username">

              <el-input type="text" placeholder="用户名" ref="username"
                v-model="formLogin.username" 
                @keyup.enter.native="usernameKeyup">
                <i slot="prepend" class="fa fa-user-circle-o"></i>
              </el-input>

            </el-form-item>
            <el-form-item prop="password">

              <el-input type="password" placeholder="密码" ref="password"
                v-model="formLogin.password"
                @keyup.enter.native="passwordKeyup">
                <i slot="prepend" class="fa fa-keyboard-o"></i>
              </el-input>

            </el-form-item>
            <el-button @click="submit" type="primary" class="button-login">登录</el-button>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util.js'
import { mapActions } from 'vuex';
import { login } from '@/api/account';

export default {
  data () {
    return {
      // 表单
      formLogin: {
        username: '',
        password: '',
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  mounted () {},
  methods: {
    ...mapActions([
      'd2adminLogin'
    ]),
    /**
     * @description 提交表单
     */
    submit () {
      // 表单验证
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 验证通过
          this.login(this.formLogin);
        }
      })
    },

    // 登陆处理
    login({ username, password }) {
      // 开始请求登录接口
      login(username, password).then((res) => {
        if (res.code === 0) {
          /**
           * 设置 cookie 一定要存 uuid 和 token 两个 cookie
           * 整个系统依赖这两个数据进行校验和存储
           * uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
           * token 代表用户当前登录状态 建议在网络请求中携带 token，如有必要 token 需要定时更新，默认保存一天
           */
          const { uuid, token, name } = res.data;

          // cookies
          util.cookies.set('uuid', uuid);
          util.cookies.set('token', token);
          this.d2adminLogin({ name });

          // 跳转路由
          this.$router.push({ name: 'index' });
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    usernameKeyup() {
      const passwordVueDom = this.$refs.password;
      passwordVueDom.focus();
      passwordVueDom.select();
    },
    passwordKeyup() {
      this.submit();
    },
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
