<template>
  <div class="textOutput" v-if="textPlay">
    <span class="textOutputChild" v-for="(item, index) in textList" :key="index" :style="item.style">
      {{item.value}}
    </span>
  </div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';

export default {
  props: {
    value: {
      type: [Array, String],
      required: false,
    },
    timeOut: {
      type: [Number],
      required: false,
    },
    animation: {
      type: [String],
      required: false,
    },
  },
  data() {
    return {
      textList: [],
      textPlay: false,
      textTimer: null,
      historyTextList: [], // 历史记录
    };
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.parsePropValue(this.value);
  },
  watch: {
    value(val) {
      this.parsePropValue(val);
      this.historyTextList.push(val);

      // 最多只保留10条记录
      if (this.historyTextList.length > 10) {
        this.historyTextList.shift();
      }
    },
  },
  methods: {
    // 解析可用文本
    parsePropValue(val) {
      if (Array.isArray(val)) {
        this.textList = val.map((item) => {
          const {value, ...style} = item;
          return { value, style };
        });
      }
      this.textList = [{ value: val, style: {} }];
      this.startPlay();
    },
    // 开始播放
    startPlay() {
      this.textPlay = true;
      const timeOut = this.timeOut;

      if (this.textTimer) {
        clearTimeout(this.textTimer);
        this.textTimer = null;
      }

      switch (true) {
        case timeOut === 0: break;
        case !!timeOut:
          this.textTimer = setTimeout(() => {
            this.textPlay = false;
          }, timeOut);
          break;
        default:
          // 取全部文本长度
          const text = this.textList.map((textItem) => {
            return textItem.value;
          }).join('');

          this.textTimer = setTimeout(() => {
            this.textPlay = false;
          }, text.length * 500);
          break;
      }
    },
  },
  components: {

  },
};
</script>

<style scoped lang="scss">
.textOutput {
  text-align: center;
  .textOutputChild {
    font-size: 2em;
  }
}
</style>
