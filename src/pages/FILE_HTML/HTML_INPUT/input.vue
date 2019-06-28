<template>
  <d2-container>
    <template slot="header">input 总览</template>
    
    <template slot="footer">
      <el-table
        :data="inputOption"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </template>
  </d2-container>
</template>

<script>
export default {
  // 如果需要缓存页面
  // name 字段需要设置为和本页路由 name 字段一致
  name: 'HTML_INPUT',
  data() {
    return {
      inputOption: {

      },
    };
  },
  components: {
    
  }
}
</script>
