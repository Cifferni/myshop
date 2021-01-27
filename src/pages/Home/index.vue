<template>
  <div>
    <TypeNav> </TypeNav>
    <Container></Container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import  Container from './Container'
import  Recommend from './Recommend'
import  Rank from './Rank'
import  Like from './Like'
import  Brand from './Brand'
import  Floor from './Floor'
export default {
  name: "Home",
  components:{
     Container, 
     Recommend,
     Rank,
     Like,
     Floor,
     Brand
  }
};
</script>

<style long="less" scoped>

</style>
