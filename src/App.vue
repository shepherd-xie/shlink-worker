<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue";

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<template>
  <head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css"
    />
  </head>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
            router
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
          <el-menu-item index="0"></el-menu-item>
          <el-menu-item index="1" route="/">Snlink</el-menu-item>
          <el-menu-item index="2" route="/admin">Admin</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <RouterView/>
      </el-main>
    </el-container>
  </div>
</template>
<!--<template>-->
<!--  <header>-->
<!--&lt;!&ndash;    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />&ndash;&gt;-->

<!--    <div class="wrapper">-->
<!--&lt;!&ndash;      <HelloWorld msg="You did it!" />&ndash;&gt;-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/admin">Admin</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->

<!--  <RouterView />-->
<!--</template>-->

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
