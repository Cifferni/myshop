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
    Header
  },
mounted() {
  console.log(this,'我是App')
},
};

</script>
<style>

</style>
