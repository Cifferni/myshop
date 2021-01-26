<template>
  <div>
    <h1>{{keyWord}} <br></h1>
  </div>
</template>

<script>
export default {
  name: "Search",
  props:['keyWord'],
  mounted(){
    console.log(this)
  }
};
</script>

<style></style>
