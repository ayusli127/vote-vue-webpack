<template>
<div class="vote-header">
        {{vote.title}}
    </div>
    <div class="vote-nav">
        <a href="">主页</a><a href="">我要投票</a>
    </div>
    <div>
        <div>分组1</div><div>分组2</div>
    </div>
    <div class="vote-intro">
        <div class="vote-info">
            <img :src="vote.picurl" alt="" class="banner"/>
            {{vote.info}}
        </div>
        <div class="vote-box" style="padding:10px;">
            <h3 class="vote-title">{{vote.title}}</h3>
            <p>投票时间：
                <span v-text="vote.statdate|timeFormat"></span>~
                <span v-text="vote.enddate|timeFormat"></span></p>
            <p>距活动结束还有：<span v-text="last_time"></span></p>
            <p>活动规则：每人总共可投1票</p>
            <div class="vote-search">
                <input type="text" placeholder="请输入投票项名称或者编号" class="vote-search-input" v-model = "keyword"/>
                <img v-on:click="search(keyword)" src="../assets/search.jpg" alt="" class="vote-search-img"/>
            </div>
        </div>
        <div class="vote-box">
            <ul class="vote-analyse">
                <li><span>参赛选手<br/><b>80</b></span></li>
                <li><span>累积投票<br/><b>12015</b></span></li>
                <li><span>累积访问<br/><b>{{vote.click}}</b></span></li>
            </ul>
        </div>
    </div>

    <div class="vote-list">
        <ul class="vote-container">
            <li class="vote-item" v-for="item in items">
                <a>
                    <img :src="item.startpicurl" alt=""/>
                    <p>{{item.item}}</p>
                    <p>{{item.address}}</p>
                    <p><span class="red">{{item.vcount}}</span>票</p>
                </a>
                <div v-on:click="addVote(item)" class="vote-btn">投我一票</div>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
	export default {     
		data(){
            return {
                vote:{},
                items:[],
                searchData:{
                    keyword:'',
                    token:'',
                    id:'',
                    wecha_id:'',
                    p:1
                },
                scroll:true
            }
		},
        route:{
            data(transition){
                this.searchData.id = transition.to.params.id;
                this.searchData.token = transition.to.params.token;
                this.searchData.wecha_id  = transition.to.params.wecha_id;
                this.$http.post('http://localhost:8081/index.php?g=Wap&m=Vote&a=getVote',this.searchData).then(function(response){
                    this.vote = response.data
                },function(response){
                    console.log('fail'+response.status);
                });
                this.$http.post('http://localhost:8081/index.php?g=Wap&m=Vote&a=getItems',this.searchData).then(function(response){
                    this.items = response.data
                },function(response){
                    console.log('fail'+response.status);
                })
            }
        },
        methods:{
            init:function(){
                this.items  = [];
                this.searchData.keyword = '';
                this.searchData.p = 1;
                this.scroll = true;
            },
            addVote:function(item){
                this.searchData.item_id = item.id;
                this.$http.post('http://localhost:8081/index.php?g=Wap&m=Vote&a=addVote',this.searchData).then(function(response){
                    if(response.data.success){
                        this.item.vcount++;
                    }
                    alert(response.data.info);
                },function(){

                });
            },
            search:function(keyword){
                this.init();
                this.searchData.keyword = keyword;
                this.getItems();
            },
            getItems:function(){
                 this.$http.post('http://localhost:8081/index.php?g=Wap&m=Vote&a=getItems',this.searchData).then(function(response){
                    if(response.data){
                        this.items = this.items.concat(response.data);
                        this.scroll = true;
                    }else{
                        this.scroll = false;
                        alert("no data more");
                    }
                },function(response){
                    console.log('fail' + response.status);
                });
            }
        }
	}
</script>
<style type="text/css">
	*{padding:0;margin:0}
    a{text-decoration: none}
    p{height:30px;line-height:30px}
    ul li{ list-style: none }
    .vote-header{background-color:#800080;height:40px;line-height:40px;text-align: center;color:#fff}
    .vote-nav{height:45px;line-height:45px; border-bottom: 1px solid #000}
    .vote-nav a{color:#800080;text-align: center;display: inline-block;width:50%;}
    .vote-nav a:last-child:before{ content:'|'; float: left; }
    .vote-intro {margin:5px;}
    .vote-intro .vote-info .banner{width:100%;height: auto;max-width: 640px;}
    .vote-intro .vote-box{ border:3px solid #ccc; border-radius:5px; -webkit-border-radius:5px; -moz-border-radius: 5px;margin-bottom:5px;}
    .vote-intro .vote-box ul.vote-analyse{ min-height:50px; height:50px; padding:5px 0; }
    .vote-intro .vote-box ul.vote-analyse li{ float: left; width:33.3%; height:100%; overflow: hidden; text-align: center; box-sizing: border-box; border-left:1px solid #ccc; }
    .vote-intro .vote-box ul.vote-analyse li:first-child{ border:none; }
    .vote-box .vote-search{margin:5px;position: relative;}
    .vote-box .vote-search .vote-search-input{width:100%;height: 30px;line-height:30px;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;border:1px solid #ddd;-webkit-apperance:none;}
    .vote-box .vote-search .vote-search-img{width:42px;padding:4px 10px;position:absolute;right:0;box-sizing: border-box;top:0}
    
    .vote-container{position: relative;margin-left:10px;}
    .vote-list .vote-item {display: inline-block ;width:150px;}
    .vote-list .vote-item img{width:100%;}
    .vote-list .vote-item .vote-btn{ background-color:#3c3c3d; color:#fff; border-radius:3px; -webkit-border-radius:3px; -moz-border-radius:3px; text-align: center; height:40px; line-height:40px; }
    .red{color:red}
    .fr{float: left;}

</style>