<template>
<div class="box">
    <div class="container">
        <h2>登陆</h2>
        <input type="text" v-model="name"><br>
        <input type="text" v-model="pass"><br>
        <button @click="login">登陆</button>
    </div>
</div>
</template>
<script>
export default {
components:{
 },
data () {
 return {
     name:'user',
     pass:'123456'
 }
},
methods:{
    login(){
        this.$router.push('/index')
    }
},
mounted(){
}
}
</script>
<style scoped>
.box{
    width: 100vw;
    height: 100vh;
    background-image:linear-gradient(to right,#543443,#303e5f);
}
.container{
    width: 400px;
    height: 260px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
   margin-top: -130px;
   margin-left: -200px;
  text-align: center;
    border-radius: 8px;
}
h2{
    line-height: 60px;
}
input{
    width: 240px;
    height: 30px;
    margin-bottom: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-indent: 1rem;
    font-size: 18px;
}
button{
    width: 240px;
    height: 30px;
    outline: none;
    border: none;
     border-radius: 4px;
    background-color: #46a0fc;
}
</style>