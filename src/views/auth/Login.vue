<template>
  <div class="container">
    <img class="login-bg" :src="background" alt="" />
    <a-form :model="formState" name="normal_login" class="login-form" @finish="onLogin">
      <a-form-item>
        <div class="login-form-header">
          <img :src="logo" alt="" />
          Template
        </div>
        <div class="login-form-desc">Frontend-Template 是一个前端模板项目</div>
      </a-form-item>
      <a-form-item name="username" :rules="[{ required: true, message: '请输入账户!' }]">
        <a-input v-model:value="formState.username" placeholder="账户" size="large">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
        <a-input-password v-model:value="formState.password" placeholder="密码" size="large">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        <a class="login-form-forgot" href="">忘记密码</a>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" size="large"> 确 定 </a-button>
      </a-form-item>
    </a-form>
    <div style="flex: 1"></div>
    <footer>Copyright © 2022 创迹软件有限公司</footer>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { login } from '@/api/login';
import storage from 'store2';

const logo = new URL('@/assets/logo.png', import.meta.url).href;
const background = new URL('@/assets/login-bg.jpg', import.meta.url).href;

// 路由
const router = useRouter();

// 表单数据
const formState = reactive({
  username: '',
  password: '',
  remember: true
});

// 提交表单时调用的函数。
const onLogin = values => {
  // 登录成功跳转路由
  login(values).then(data => {
    if (data.code === 0) {
      notification.open({
        message: '登录成功',
        description: '欢迎您!'
      });
      storage.set('token', '123456');
      router.push({ name: 'DataTable' });
    } else {
      notification.open({
        message: '登录失败',
        description: '请检查账号或密码是否正确'
      });
    }
  });
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100%;
  padding-top: 120px;
  flex-direction: column;
  align-items: center;

  .login-bg {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }

  .login-form {
    width: 360px;

    .login-form-header {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 15px;
    }

    .login-form-desc {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      margin-bottom: 30px;
    }

    .login-form-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
  }

  footer {
    margin-bottom: 15px;
    line-height: 30px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
