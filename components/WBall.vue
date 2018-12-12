<template>
  <div class="homepage">
    <div class="timeboxout ball">
      <div class="timeboxmiddle ball">
        <div class="timeboxin">
          <div class="box">
            <div class="percent">
              <!-- <p id="prompt1">第<span id="nw"></span>周</p>
              <p id="prompt2">本周剩余时间</p>
              <p id="prompt3">

                <span id="days"></span>
                <span id="hours"></span>
                <span id="minutes"></span>
                <span id="seconds"></span>
              </p> -->
            </div>
            
            <!-- 最底层水量 -->
            <div id="water" class="water ball" :style="ballStyle">
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
    type:{
      type:String,
      defaule:'unfinished',
      validator:val => ['unfinished','leave','complete'].indexOf(val) > -1
    },
    percentage:{
      type:Number,
      default:0,
      // required:true,
      validator: val => val >= 0 && val <= 100
    },
    status:{
      type:String,
      validator:val => ['start', 'half', 'many', 'end'].indexOf(val) > -1
    },
    color:{
      type:String,
      default:''
    }
  },
   data () {
    return {

    }
  },
  computed: {
    ballStyle(){
      const syle = {};
      style.backgroundColor = this.color;
      return  style;
    },
    stroke(){
      let ret;
      if(this.color) {
        ret = this.color;
      }else(this.status){
        case '':
        ret = '';
        break;
      }
    },
  },
  methods: {

   } 
}
</script>

<style scoped>
.homepage .box{
      width: 56%;
      height: 100%;
      /*ackground-color: #f2f2f2;*/  /*球体内部背景色*/
}
      
      
.homepage .timeboxout{
      width: 11.5625rem;
      height: 11.5625rem;
      box-sizing: border-box;
      border: 1px solid #2edb75;
      border-radius: 50%;
      position: relative;
      margin-left: auto;margin-right: auto;
      margin-bottom: 1rem;
}

.homepage .timeboxmiddle{
      width: 10.9375rem;height: 10.9375rem;
      box-sizing: border-box;
      background: -webkit-linear-gradient(top,#ffffff,#f8cd51);
      border-radius: 50%;
      position: absolute;
      top: 50%;left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
}

.homepage .timeboxin{
      background-color: #ffffff;
      width: 10.875rem;height: 10.875rem;
      box-sizing: border-box;
      border-radius: 50%;
      position: absolute;
      top: 50%;left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
}
     

.homepage .box {
    height: 10.875rem;
    width: 10.875rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 100%;
    overflow: hidden;
}
.homepage .box .percent {
   text-align: center;
   color: black;
   margin-top: 2.03125rem;
   z-index: 3;
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   height: 100%;width: 100%;
}
/*.homepage p{margin-bottom: 0.5625rem;}*/
#prompt1{
      font-size: 1.1875rem;
}
#prompt2{
      font-size: 0.8125rem;
}
#prompt3{
      font-size: 1.125rem;
}
.homepage .box .water {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
      background: #2edb75;
}

.homepage .box .water_wave {
      width: 200%;
      position: absolute;
      bottom: 100%;
}
.homepage .box .water_wave_back {               /*后面的波纹*/
      right: 0;
      fill: #7befaa;
      -webkit-animation: wave-back 1.4s infinite linear;
      animation: wave-back 1.4s infinite linear;
}
.homepage .box .water_wave_front {              /*前面的波纹*/
      left: 0;
      fill: #2edb75;
      margin-bottom: -1px;
      -webkit-animation: wave-front .7s infinite linear;
      animation: wave-front .7s infinite linear;
}

/*是波浪匀速移动*/

@-webkit-keyframes wave-front {
      100% {
            -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
      }
}
@keyframes wave-front {
      100% {
            -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
      }
}
@-webkit-keyframes wave-back {
      100% {
            -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
      }
}
@keyframes wave-back {
      100% {
            -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
      }
}
</style>