<template>
  <div class="hardwareBox">
    <!-- 今日天气 -->
    <!-- 当前时间 -->
    <!-- 当前日期 -->
    <!-- 周 -->
  </div>
</template>


<script>
import { aMapWeatherWeatherInfo } from '@/api/account';
import { setInterval } from 'timers';
export default {
  props: {
  },
  data() {
    return {
      // 当前城市
      currentCity: '110113',
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
    };
  },
  computed: {

  },
  created() {
  },
  mounted() {
    // 获取天气
    this.startGetAMapWeatherWeatherInfo();
  },
  watch: {

  },
  methods: {
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
      aMapWeatherWeatherInfo(this.currentCity).then((data) => {
        if (data.status === '1') {
          this.currentCityWeather = data.lives[0];
        }
      });
    },

    // 获取近4天天气数据
    aMapWeatherWeatherInfo_all() {
      aMapWeatherWeatherInfo(this.currentCity, 'all').then((data) => {
        if (data.status === '1') {
          this.futureCityWeather = data.forecasts[0];
        }
      });
    }
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
.hardwareBox {
  width: 100%;
  height: 100%;
  background: #000;
  color: #FFF;
}
</style>
