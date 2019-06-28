<template>
  <d2-container>
    <el-table ref="filterTable" :data="logInfo" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="info" label="操作日志"/>
  </el-table>
  </d2-container>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      logInfo: [{
        date: '2018-01-01',
        info: '登陆系统',
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

  },
  components: {

  },
};
</script>

<style scoped lang="scss">

</style>
