<template>
  <d2-container class="jarvisMain">
    <el-button type="primary"
      v-for="item in addFunctions" :key="item.id"
      @click="runFunction(item)">{{ getNextItem(item).name }}</el-button>

    <el-button class="button-new-tag" disabled="disabled" @click="addFunction">新增功能</el-button>
    <addFunction ref="addFunctionVue"/>
  </d2-container>
</template>

<script>
import addFunction from './addFunction';
import func from './utils/functions';
/**
  1. 开关型功能 (打开 or 关闭, 两种状态不能同时存在)
    开启或关闭都会推送不同的数据到客户端
    {
      id: '',
      condition: [],
      values: [{name: xxx, value: 'xxx'}],
    }

 */
export default {
  props: {

  },
  data() {
    return {
      addFunctions: [{
        id: 'PowerSupply', // id
        value: 'off', // 默认状态
        condition: [],  // 执行该功能所需条件
        values: [
          { name: '开机', value: 'on', run: '[preset][powerSupplyStart]()', id: 'PowerSupply$on' },  // 第一种状态
          { name: '关机', value: 'off', run: '[preset][run]()', id: 'PowerSupply$off' }, // 第二种状态
        ]
      }],
    };
  },
  computed: {

  },
  created() {
  },
  mounted() {

  },
  watch: {

  },
  methods: {
    /**
     * 添加一个功能
     */
    addFunction() {
      this.$refs.addFunctionVue.show(this.addFunctions);
    },
    /**
     * 执行一个功能
     */
    runFunction(item) {
      const runFun = this.getNextItem(item);
      func(runFun.run);
    },
    /**
     * 获取即将执行的功能
     */
    getNextItem(item) {
      const { values } = item;
      const findIndex = values.findIndex(valueInfo => valueInfo.value === item.value) + 1;
      const index = findIndex >= values.length ? 0 : findIndex;
      return values[index];
    },
  },
  components: {
    addFunction
  },
};
</script>

<style scoped lang="scss">
// .jarvisMain {
  
// }
</style>
