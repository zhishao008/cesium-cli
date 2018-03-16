<template>
	<div>
		<input type="text" name="" v-focus>
    <keep-alive>
      <button @click="send">click</button>
    </keep-alive>
		
    <button @click="loading">loading</button>
    <button @click="alert">Alert</button>
    <button @click="dialog">dialog</button>
	</div>
</template>
<script>
import axios from 'axios';
import Loading from './loading/index.js'
import Alert from './alert/index.js'
	export default{
		data(){
			return{
				name:''
			}
		},
		directives:{
			focus:{
				inserted:function(el){
					el.focus()
				}
			}
		},
		methods:{
			send(){
				// axios.get('http://localhost:3003/list').then(res => console.log(res))	
			},
      loading(){
        this.$loading.open();
      },
      alert(){
        this.$alert('做一个健身计划');
      },
      dialog(){
        this.$dialog({
          title:"tishi",
          msg: '试玩场只是小试牛刀，你还可去正式场游戏，注册后赢钱可提现！',
          isClose: true,
          btns: [
            {
              text: '立即注册',
              callback: () => {
                this.$router.push({
                  name: 'register'
                });
              }
            }
          ]
        })
      }
		},
		create(){

		},
    components:{
      'v-loading':Loading
    }
	}
</script>
<style>
	
</style>

<!-- SendCaptcha({
      state,
      commit
    }, {
      Phone,
      Type = '4'
    }) {
      return new Promise((resolve, reject) => {
          axios.post(API.SendCaptcha, {
              Phone,
              Type
            })
            .then(res => {
              if (res.data.Meta.ErrorCode === '0') {
                resolve(res.data.Body);
              } else {
                reject(res.data.Meta);
              }
            })
            .catch(err => {
              reject({
                ErrorCode: '-101',
                ErrorMsg: state.ALERT_MSG.NET_ERROR
              });
            });
        })
        .catch(err => {
          throw err;
        });
    }, -->