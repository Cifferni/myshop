<template>
  <div>
    <TypeNav> </TypeNav>
    <Container></Container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
     <Floor v-for="item in floorData" :key="item.id" :floorData='item'></Floor> 
    <Brand></Brand>
  </div>
</template>

<script>
import Container from "./Container";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Brand from "./Brand";
import Floor from "./Floor";
import {mapState} from 'vuex'
export default {
  name: "Home",
  components: {
    Container,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
    mounted(){
      this.$store.dispatch('getFloorData')
    },
    computed:{
       ...mapState({
         floorData:state => state.home.floorData
       })
    }
 
};
</script>

<style long="less" scoped></style>
