<template>
    <div class="block">
        <h3>音乐</h3>
        <input type="text" placeholder="please enter music name!" v-model="enterName"/>
        <button class="btn" @click="handlebook">添加</button>
        <ul v-if="musiclist.length > 0">
            <li v-for="(item, index) in musiclist" v-text="item"></li>
        </ul>
        <p class="nodata" v-else>暂无数据</p>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        data() {
            return {
                enterName: ""
            }
        },
        computed: {
            ...mapGetters([
                'musiclist'
            ]),
        },

        methods: {
            ...mapActions([
                'addMusic'
            ]),
            handlebook(){
                if(!this.enterName){
                    alert("请输入音乐名称！");
                    return;
                }
                this.addMusic(this.enterName).then((data) => {
                    alert(data);
                    this.enterName = "";
                }, (err) => {
                    alert(err);
                })
            }
        }
    }
</script>


<style scoped>
    input{
        padding: 4px;
        font-size: 14px;
        min-width: 300px;
    }
    .btn{
        padding: 4px;
        width: 100px;
    }
</style>
