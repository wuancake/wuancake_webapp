<template>
    <div class="grouping-page">
        <aside class="wuan_cake_grouping">
            <ul class="wuan_cake_list">
              <!-- <el-radio-group v-model="curState" @change="curStateChange">
                    <el-radio v-for="(item,index) in stateGroup" :label="item.code" :key="index">{{ item.name }}</el-radio>
                  </el-radio-group> -->
                <li v-for="item in groups" :key="item.id" @click="selectGroup(item.id)" class="wuan_cake_radio">
                  <div class="wuan_cake_radio_block">
                      <input type="radio" name="grouping" class="wuan_cake_radio_input" />
                  </div>
                  <div class="wuan_cake_radio_label">{{ item.groupName }}</div>
                </li>
            </ul>
            <div class="login-btns">
              <button @click="getGroup" class="login-btn login-btn-item">提交</button>
            </div>
        </aside>
    </div>
</template>

<script>
import { group } from '../api/index.js'
import { findAllGroupInfo } from '../api/index.js'
import { mapMutations } from 'vuex';
import WButton from '../components/WButton'

export default {
    name: 'grouping',
     data() {
      return{
        usergroup:{
          userid:'',
          groupid:'',
        },
        groups:[],
      }
     },
    components:{
      WButton
    },
    mounted() {
    this.getGriopInfo()
    },
    methods:{
      //获取所有分组列表
      getGriopInfo(){
        findAllGroupInfo({
        }).then(res=>{
           console.log(res.data);
          if(res.data.infoCode ==="200"){
            this.groups = res.data.groups;
            
            console.log(this.groups.length);
          }
        })
      },
      // 选择分组
      ...mapMutations('user', ['setUserInfo']),
      getGroup(){
        group({
          userId: this.$store.state.user.userInfo.userId,
          groupId: this.usergroup.groupid
        }).then(res => {
          if(res.data.infoCode != 200){
            alert(res.data.infoText)
          }else{
            this.setUserInfo({ groupId: res.data.groupId });
            alert(res.data.infoText)
            this.$router.push({
              path: '/'
            })
          }
        })
      },
      selectGroup (groupId) {
        this.usergroup.groupid = groupId
      }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

// 单选  
.el-radio
    color: #606266
    font-weight 500
    line-height 1
    cursor pointer
    white-space nowrap
    outline 0

input[type=radio]
    box-sizing border-box
    padding 0
    background-color red
    

.wuan_cake_grouping
  width 80%;
  margin 0 auto
  margin-top 100px

.wuan_cake_list
    border 1px solid #cecece
    margin-bottom  50px
    color #555555
    

    li
        font-size 30px
        height 100px
        line-height 100px
        border-bottom 1px solid #f4f4f4
        display flex
        justify-content flex-start
        align-items center

        &:nth-child(even)
            background-color #f5f9ff

        &:nth-child(odd)
            background-color #ffffff

        &:last-child
            border-bottom none

    .wuan_cake_radio_block
        width 100px
        height 100px
        border-right 1px solid #cecece

       .wuan_cake_radio_input
            radio()

    .wuan_cake_radio_label
        width 100%
        text-align center

.login-btn
  width: 540px
  height 84px
  text-align center
  line-height 84px
  box-sizing border-box
  font-size 34px
  border 0

.login-btn-item
  border-radius 42px
  &:last-child
    background  $input-primaryLightBLue
    color #ffffff
</style>