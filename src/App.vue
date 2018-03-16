<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <v-test></v-test>  
  </div>
</template>

<script>
import Test from './components/test.vue'
export default {
  data(){
    return {
        
    }
  },
  name: 'App',
  components:{
    'v-test':Test
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
