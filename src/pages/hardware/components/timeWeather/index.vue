<template>
  <div class="timeWeather">
    <div class="timeWeatherBox rightSplit">
      <div class="hardwareTime">
        {{hardwareDate.hour}}:{{hardwareDate.minute}}
      </div>
      <div class="hardwareDate">
        {{hardwareDate.month}}月{{hardwareDate.day}}日星期{{hardwareDate.week_CN}}
      </div>
    </div>
    <div class="timeWeatherBox rightSplit">
      <div class="hardwareTemperature">{{hardwareWeather.temperature}}°</div>
      <div class="hardwareCity">{{hardwareWeather.city}}</div>
    </div>
    <div class="timeWeatherBox">
      <div class="hardwareHumidity">
        <span>{{hardwareWeather.weather}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { aMapWeatherWeatherInfo, aMapWeatherIpGetCity } from '@/api/account';
import { mapGetters, mapActions } from 'vuex';
import * as moment from 'moment';

import { WEEK_NUMBER_PARSE } from '@/constants/constant';

export default {
  props: {
    // 当前城市
    currentCity: {
      type: [Number, String],
      required: false,
    }
  },
  // 城市/区：data.city
  // 天气：data.weather
  // 温度：data.temperature
  // 风向：data.windDirection
  // 风力：data.windPower
  // 空气湿度：data.humidity
  // 发布时间：data.reportTime
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['hardwareDate', 'hardwareWeather', 'hardwarePosition', 'hardwareFutureWeather']),

    // 自动获取到的城市代码
    autoCurrentCityCode() {
      return (this.hardwarePosition.adcode || '');
    },
  },
  created() {
    // 获取位置信息
    this.getAutoCurrentCity().then(() => {
      // 获取天气
      this.startGetAMapWeatherWeatherInfo();
    });

    // 获取时区信息
    this.getHardwareDate();
    setInterval(() => this.getHardwareDate(), 1000);
  },
  mounted() {

  },
  watch: {

  },
  methods: {

    // 根据IP获取当前位置
    getAutoCurrentCity() {
      return aMapWeatherIpGetCity().then((data) => {
        this.setHardwarePosition(data);
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
      const cityCode = this.currentCity || this.autoCurrentCityCode;
      console.log(cityCode);
      aMapWeatherWeatherInfo(cityCode).then((data) => {
        if (data.status === '1') {
          this.setHardwareWeather(data.lives[0]);
        }
      });
    },

    // 获取近4天天气数据
    aMapWeatherWeatherInfo_all() {
      const cityCode = this.currentCity || this.autoCurrentCityCode;
      aMapWeatherWeatherInfo(cityCode, 'all').then((data) => {
        if (data.status === '1') {
          this.setFutureWeather(data.forecasts[0]);
        }
      });
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
      const currentMomentInfo = {
        second: second < 10 ? `0${second}` : second,
        minute: minute < 10 ? `0${minute}` : minute,
        hour: hour < 10 ? `0${hour}` : hour,
        day: day < 10 ? `0${day}` : day,
        month: month < 10 ? `0${month}` : month,
        week_CN: WEEK_NUMBER_PARSE[week],
        week, quarter, year };

      this.setHardwareDate(currentMomentInfo);
    },

    ...mapActions(['setHardwareDate', 'setHardwareWeather', 'setHardwarePosition', 'setFutureWeather']),
  },
  components: {

  },
};
</script>

<style lang="scss" scoped>
.timeWeather {
  display: inline-block;
  .timeWeatherBox {
    display: inline-block;
    margin: 0.5em 0.7em;
  }
  .hardwareDate, .hardwareCity {
    font-size: 1.4em;
  }
  .hardwareTime, .hardwareTemperature {
    font-size: 4em;
  }

  .hardwareHumidity {
    font-size: 4em;
  }

  .rightSplit {
    border-right: 2px solid;
    padding-right: 1.5em;
  }
}
</style>
