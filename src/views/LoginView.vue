<template>
  <div>
    <h2>Please Enter Token</h2>
    <input v-model="token" type="password" placeholder="Enter your token"/>
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: ''
    };
  },
  methods: {
    login() {
      const body = { token: this.token }
      try {
        fetch('/api/auth', {
          method: 'post',
          headers: {
            'content-type': 'application/json',
            'Authorization': this.token
          },
          body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
              if (res.success) {
                // Token 验证成功，跳转到短链生成页面
                localStorage.setItem('token', this.token);
                this.$router.push('/');
              } else {
                // Token 验证失败，显示错误信息
                this.errorMessage = 'Invalid token, please try again.';
              }
            })


      } catch (error) {
        this.errorMessage = 'Error verifying token. Please try again.';
        console.error(error);
      }
    }
  }
};
</script>
