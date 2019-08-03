<template>
  <div class="textOutput" v-if="textPlay">
    <p class="outputLine" v-for="(item, index) in playTextList" :key="index">
      <span class="textOutputChild" v-for="(val, i) in item" :key="i" :style="val.style">
        {{val.value}}
      </span>
    </p>
  </div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
import { Promise } from 'q';
import { resolve } from 'dns';
import MD5 from 'js-md5';

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
      playTextList: [],
      textPlay: false,
      textTimer: null,
      historyTextList: [], // 历史记录
      APPID: '5d418772',
      APIKey: 'a82fa5f53df0b8aa3d325fcfec531aff',
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
      // 文本被修改之后说明有新的语言
      this.play(val);

      // 记录输出语言，最多只保留10条记录
      this.historyTextList.push(val);
      if (this.historyTextList.length > 10) {
        this.historyTextList.shift();
      }
    },
  },
  methods: {
    // 解析可用文本
    parsePropValue(val) {
      if (Array.isArray(val)) {
        return val.map((item) => {
          const {value, ...style} = item;
          return { value, style };
        });
      }
      return [{ value: val, style: {} }];
    },
    // 清理定时器
    clearTimeout() {
      if (this.textTimer) {
        clearTimeout(this.textTimer);
        this.textTimer = null;
      }
    },
    // 开始播放
    startPlay() {
      this.textPlay = true;
      const timeOut = this.timeOut;
      this.clearTimeout();

      switch (true) {
        case timeOut === 0: break;
        case !!timeOut:

          this.textTimer = setTimeout(() => {
            this.textPlay = false;
          }, timeOut);
          break;
        default:
          // 取全部文本长度
          const text = this.playTextList.map((textItem) => {
            return textItem.value;
          }).join('');

          this.textTimer = setTimeout(() => {
            this.textPlay = false;
          }, text.length * 500);
          break;
      }
    },
    // 播放一个新的文本
    play(value) {
      const textItem = this.parsePropValue(value);

      // 合成音频
      this.synthesizedAudio(textItem).then((audioContent) => {
        // 播放音频
        this.playAudio(audioContent);
        // 追加字幕
        this.appendText(textItem);
      });

      // this.playTextList.push();
      // this.startPlay();
    },
    // 合成音频
    synthesizedAudio() {
      return new Promise(resolve => {
        // 讯飞开放平台注册申请应用的应用ID(appid)
        const XAppid = this.APPID;
        const APIKey = this.APIKey;
        // 从1970年1月1日0点0 分0 秒开始到现在的秒数
        const XCurTime = +new Date();
        // 相关参数JSON串经Base64编码后的字符串，详见业务参数
        const XParam = 'eyJhdWYiOiAiYXVkaW8vTDE2O3JhdGU9MTYwMDAiLCJhdWUiOiAicmF3Iiwidm9pY2VfbmFtZSI6ICJhaXNqaW5nZXIiLCJzcGVlZCI6ICI1MCIsInZvbHVtZSI6ICI4MCIsInBpdGNoIjogIjUwIiwiZW5naW5lX3R5cGUiOiAiaW50cDY1IiwidGV4dF90eXBlIjogInRleHQifQ==';
        const XCheckSum = MD5(APIKey + XCurTime + XParam);
        xfyunServiceV1Tts({}, '').then(() => {

        });
      });
    },
    // 播放音频合成
    playAudio() {

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
