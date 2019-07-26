<template>
  <div class="hardwareBox" ref="hardwareBox" :style="{fontSize: `${fontSize}px`}">
    <div class="hardwareTime">
      {{currentMoment.hour}}:{{currentMoment.minute}}
      <span class="second">{{currentMoment.second}}</span>
    </div>
    <div class="hardwareDate">
      {{currentMoment.year}}年{{currentMoment.month}}月{{currentMoment.day}}日星期{{weekParseList[currentMoment.week]}}
    </div>
    <div></div>
    <!-- 今日天气 -->
  </div>
</template>


<script>
import { aMapWeatherWeatherInfo, aMapWeatherIpGetCity } from '@/api/account';
import * as moment from 'moment';

export default {
  props: {
  },
  data() {
    return {
      fontSize: 12,
      // 当前城市
      currentCity: '',
      autoCurrentCity: '',
      // 当前城市数据近4天数据
      // 城市/区：data.city
      // 天气：data.weather
      // 温度：data.temperature
      // 风向：data.windDirection
      // 风力：data.windPower
      // 空气湿度：data.humidity
      // 发布时间：data.reportTime
      futureCityWeather: {},
      currentCityWeather: {},
      currentMoment: {},
      weekParseList: ['', '一', '二', '三', '四', '五', '六', '日'],
    };
  },
  computed: {

  },
  created() {
  },
  mounted() {
    // 界面大小自适应
    window.removeEventListener('resize', this.hardwareBoxEMResize);
    window.addEventListener('resize', this.hardwareBoxEMResize);
    this.hardwareBoxEMResize();

    // 获取位置信息
    this.getAutoCurrentCity().then(() => {
      // 获取天气
      this.startGetAMapWeatherWeatherInfo();
    });

    // 获取时区信息
    this.getHardwareDate();
    setInterval(() => this.getHardwareDate(), 1000);
  },
  watch: {

  },
  methods: {
    // 根据IP获取当前位置
    getAutoCurrentCity() {
      return aMapWeatherIpGetCity().then((data) => {
        return this.autoCurrentCity = data.adcode;
      });
    },

    // 获取天气数据, 近4天天气数据, 每天只更新4次, 每6小时更新一次
    // 今日天气数据, 每分钟更新一次
    startGetAMapWeatherWeatherInfo() {
      this.aMapWeatherWeatherInfo_all();
      this.aMapWeatherWeatherInfo_base();
      setInterval(() => this.aMapWeatherWeatherInfo_base(), 60 * 1000);
      setInterval(() => this.aMapWeatherWeatherInfo_all(), 4 * 60 * 60 * 1000);
    },

    // 获取今日天气数据
    aMapWeatherWeatherInfo_base() {
      aMapWeatherWeatherInfo(this.currentCity || this.autoCurrentCity).then((data) => {
        if (data.status === '1') {
          this.currentCityWeather = data.lives[0];
        }
      });
    },

    // 获取近4天天气数据
    aMapWeatherWeatherInfo_all() {
      aMapWeatherWeatherInfo(this.currentCity || this.autoCurrentCity, 'all').then((data) => {
        if (data.status === '1') {
          this.futureCityWeather = data.forecasts[0];
        }
      });
    },

    // 界面自适应
    hardwareBoxEMResize() {
      const hardwareBoxElement = this.$refs.hardwareBox;
      const { offsetWidth } = hardwareBoxElement;
      this.fontSize = parseInt(offsetWidth / 100, 10);
    },

    // 获取日期/星期/时间等数据
    getHardwareDate() {
      const currentMoment = moment();
      const second = currentMoment.second();    // 秒
      const minute = currentMoment.minute();    // 分钟
      const hour = currentMoment.hour();        // 小时
      const day = currentMoment.date();         // 天
      const week = currentMoment.weekday();     // 星期
      const month = currentMoment.month() + 1;  // 月
      const quarter = currentMoment.quarter();  // 季度
      const year = currentMoment.year();        // 年
      this.currentMoment = {
        second: second < 10 ? `0${second}` : second,
        minute: minute < 10 ? `0${minute}` : minute,
        hour: hour < 10 ? `0${hour}` : hour,
        day: day < 10 ? `0${day}` : day,
        month: month < 10 ? `0${month}` : month,
        week, quarter, year };
    },
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
.hardwareBox {
  width: 100%;
  height: 100%;
  color: #FFF;
  background: #000;
  position: relative;

  .hardwareDate {
    width: 100%;
    bottom: 1em;
    font-size: 4em;
    text-align: right;
    position: absolute;
    padding-right: 1em;
    box-sizing:border-box;
  }

  .hardwareTime {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10em;
    position: absolute;
    text-align: center;
    .second {
      text-indent: -0.5em;
      display: inline-block;
      font-size: 0.4em;
    }
  }
}
</style>
