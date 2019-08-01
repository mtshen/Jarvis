<template>
  <div class="hardwareBox" ref="hardwareBox" :style="{fontSize: `${fontSize}px`}">
    <!-- 输出 -->
    <!-- 声音交互可视 -->
    <textOutput value="哈哈哈哈哈哈哈哈哈" class="hardwareTextOutput" :timeOut="0"/>

    <!-- 输入 -->
    <!-- 天气感知 -->
    <timeWeather currentCity="110000" class="hardwareTimeWeather"/>
    <!-- 听觉 -->
    <!-- 视觉 -->
  </div>
</template>


<script>
import timeWeather from './components/timeWeather';
import textOutput from './components/textOutput';

export default {
  props: {
  },
  data() {
    return {
      fontSize: 12,
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
  },
  watch: {

  },
  methods: {
    // 界面自适应
    hardwareBoxEMResize() {
      const hardwareBoxElement = this.$refs.hardwareBox;
      const { offsetWidth } = hardwareBoxElement;
      this.fontSize = parseInt(offsetWidth / 100, 10);
    },
  },
  components: {
    timeWeather,
    textOutput,
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

  .hardwareTextOutput, .hardwareTimeWeather {
    font-size: 1em;
    position: absolute;
  }

  .hardwareTimeWeather {
    top: 1em;
    right: 1em;
  }

  .hardwareTextOutput {
    bottom: 1em;
    width: 100%;
    left: 0;
  }
}
</style>
