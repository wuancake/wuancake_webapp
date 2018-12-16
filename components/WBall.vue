<template>
  <div 
    class="homepage" 
    :class="type,status">

    <div class="timeboxout ball">
      <div class="timeboxmiddle ball">
        <div class="timeboxin">
          <div class="box">
            <div class="percent">
              <p id="prompt1">{{ time.week }}</p>
              <p id="prompt2">{{ time.instructions }}</p>
              <p id="prompt3" v-show="isCountdown">{{ time.countdown }}</p>
            </div>
            
            <!-- 最底层水量 -->
            <div id="water" class="water ball" >
            <!-- 后面的水波 -->
              <svg viewBox="0 0 560 20" class="water_wave water_wave_back ball">
                <use xlink:href="#wave"/>
              </svg>
              <!-- 水波前面的波浪 -->
              <svg viewBox="0 0 560 20" class="water_wave water_wave_front ball">
                <use xlink:href="#wave"/>
              </svg>
            </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SVG波浪瞄点 -->
  <svg version="1.1" x="0px" y="0px" style="display: none;">
    <symbol id="wave">
      <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,
              27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,
              31.5-2.7c0,0,0,0,0,0v20H420z"/>
      <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,
              6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"/>
      <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,
              27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,
              31.5-2.7c0,0,0,0,0,0v20H140z"/>
      <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,
              6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"/>
    </symbol>
  </svg>
</div>
</template>

<script>
export default {
  name: 'WBall',
  props:{
    // 进度球类型：未完成，请假，完成
    type:{
      type:String,
      defaule:'w',
      validator:val => ['w','complete','leave'].indexOf(val) > -1
    }
  },
   data () {
    return {
      status:'',
      isCountdown:true,
      time:{
        week:'',
        instructions:'',
        countdown:''
      }
    }
  },
  watch:{},
  computed: {},
  created(){},
  mounted(){
    this.ballText();
    setInterval(()=>{this.residueTime(), 1000});
    this.outi();
    this.weeknum();
  },
  methods:{
    // 类型判断文字输出
    ballText(){
      switch (this.type) {
        case "w":
          this.time.instructions="本周剩余时间";
          this.isCountdown=true;
          break;
        case "complete":
          this.time.instructions="本周已提交";
          this.isCountdown=false;
          break;
        case "leave":
          this.time.instructions="本周已请假";
          this.isCountdown=false;
          break;
      }
    },
    weeknum(){
      // 获取当前时间
      let currentTime = new Date();
      let targetTime = (new Date(2015, 10, 2, 0, 0, 0)).getTime();
      let offsetTime =currentTime - targetTime;
      // 将时间转位天数
      let offsetDays =Math.floor((offsetTime / (3600 * 24 * 1000))/7);
      let week = offsetDays+1;
      this.time.week = `第${week}周`
    },
    // 周数倒计时
    residueTime(){
        let newtime = new Date();
        let day = newtime.getDay(); //得到今天周几
        let hours = newtime.getHours(); //得到现在时间的小时
        let minuter = newtime.getMinutes(); //得到现在时间的分数
        let second = newtime.getSeconds(); //得到现在时间的秒数
        day = 7 - (day ? day : 7);
        hours = 23 - hours;
        minuter = 59 - minuter;
        second = 59 - second;
        if (day==0) { 
          this.time.countdown = `${hours}时${minuter}分${second}秒` ;
        } else{
          this.time.countdown = `${day}天${hours}时${minuter}分${second}秒`;
        }
        // 比例换算
        let progress = ((day * 24 * 60 * 60 + hours * 60 * 60 + minuter * 60 + second) / 604800) * 100
        return progress;
    },
    // 球面颜色变化
    outi(){
      let timeRate = this.residueTime();
      let water = document.getElementById("water");
      water.style.transform = 'translate(0' + ',' + (100 - timeRate) + '%)';

      if (timeRate === 0  || this.type === 'leave' || this.type === 'complete') {
        console.log(0);
          document.getElementsByTagName("svg")[0].innerHTML = "";
          document.getElementsByTagName("svg")[1].innerHTML = "";
        }
      else if(timeRate >50) {
        this.status = "w";
        console.log('w',11)

      }
      else if(timeRate <= 50 && timeRate > 20) {
        this.status = "w50";
        console.log('w50',22)
      }
      else{
        this.status = "w20";
        console.log('w20',333)
      }

    },
  }
}
</script>

<style  lang="stylus" scoped>
.homepage .box
  width 56%
  height 100%
  /*ackground-color: #f2f2f2;*/  /*球体内部背景色*/
      
.homepage .timeboxout
  width 11.5625rem
  height 11.5625rem
  box-sizing border-box
  border 1px solid #2edb75
  border-radius 50%
  position relative
  margin-left auto
  margin-right auto
  margin-bottom 1rem

.homepage .timeboxmiddle
  width 10.9375rem;height: 10.9375rem
  box-sizing border-box
  background -webkit-linear-gradient(top,#ffffff,#2edb75)
  border-radius 50%
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  overflow hidden

.homepage .timeboxin
  background-color #ffffff
  width 10.875rem
  height 10.875rem
  box-sizing border-box
  border-radius 50%
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  overflow hidden

.homepage .box
  height 10.875rem
  width 10.875rem
  position absolute
  top 50%
  left 50%
  -webkit-transform translate(-50%, -50%)
  transform translate(-50%, -50%)
  border-radius 100%
  overflow hidden

.homepage .box .percent 
  text-align center
  color black
  margin-top 1.03125rem
  z-index 3
  position absolute
  left 50%
  transform translateX(-50%)
  height 100%
  width 100%

/*.homepage p{margin-bottom: 0.5625rem;}*/
#prompt1
  font-size 1.1875rem

#prompt2
  font-size 0.8125rem

#prompt3
  font-size 1.125rem

.homepage .box .water
  position absolute
  left 0
  top 0
  z-index 2
  width 100%
  height 100%
  -webkit-transform translate(0, 100%)
  transform translate(0, 100%)
  background #2edb75

.homepage .box .water_wave
      width 200%
      position absolute
      bottom 100%

/*后面的波纹*/
.homepage .box .water_wave_back
      right 0
      fill #7befaa
      -webkit-animation wave-back 1.4s infinite linear
      animation wave-back 1.4s infinite linear

/*前面的波纹*/
.homepage .box .water_wave_front
      left 0
      fill #2edb75
      margin-bottom -1px
      -webkit-animation wave-front .7s infinite linear
      animation wave-front .7s infinite linear

// 请假
.homepage.leave
  & .timeboxout 
    border 1px solid #8ca1d1
  & .timeboxmiddle
    background -webkit-linear-gradient(top,#ffffff,#8ca1d1)
  & .percent
    color #8ca1d1
  & .water
    background #fff
  & .water_wave_back
    fill #fff
  & .water_wave_front
    fill #fff

// 完成
.homepage.complete
  & .timeboxout 
    border 1px solid #34a853
  & .timeboxmiddle
    background -webkit-linear-gradient(top,#ffffff,#34a853)
  & .percent
    color #34a853
  & .water
    background #fff
  & .water_wave_back
    fill #fff
  & .water_wave_front
    fill #fff

// 周报倒计时 100
.homepage.w
  & .timeboxout 
    border 1px solid #2edb75
  & .timeboxmiddle
    background -webkit-linear-gradient(top,#ffffff,#2edb75)
  // & .percent
  //   color #2edb75
  & .water
    background #2edb75
  & .water_wave_back
    fill #7befaa
  & .water_wave_front
    fill #2edb75

// 周报倒计时 50
.homepage.w50
  & .timeboxout 
    border 1px solid #fbbc05
  & .timeboxmiddle
    background -webkit-linear-gradient(top,#ffffff,#fbbc05)
  // & .percent
  //   color #ffd762
  & .water
    background #fbbc05
  & .water_wave_back
    fill #ffd762
  & .water_wave_front
    fill #fbbc05

// 周报倒计时 20
.homepage.w20
  & .timeboxout 
    border 1px solid #fe6c0d
  & .timeboxmiddle
    background -webkit-linear-gradient(top,#ffffff,#fe6c0d)
  // & .percent
  //   color #fe6c0d
  & .water
    background #fe6c0d
  & .water_wave_back
    fill #ff9753
  & .water_wave_front
    fill #fe6c0d

/*是波浪匀速移动*/

@-webkit-keyframes wave-front 
  100% 
    -webkit-transform translate(-50%, 0)
    transform translate(-50%, 0)

@keyframes wave-front
  100%
    -webkit-transform translate(-50%, 0)
    transform translate(-50%, 0)

@-webkit-keyframes wave-back
  100%
    -webkit-transform translate(50%, 0)
    transform translate(50%, 0)
@keyframes wave-back
  100%
    -webkit-transform translate(50%, 0)
    transform translate(50%, 0)
</style>