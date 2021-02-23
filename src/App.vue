<template>
  <div>

       <Header></Header>
      <router-view></router-view>
     <Footer v-show='!$route.meta.isShow'></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header'  
import Footer from '@/components/Footer'  
export default {
  name: "App",
  components:{
    Footer,
    Header,
  },
  mounted(){
    //获取三级分类列表数据是一样的,放在app组件里发请求,就会请求一次,
     this.$store.dispatch("getCategoryList");
  }

};

</script>
<style>

</style>
