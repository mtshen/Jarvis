<template>
  <el-dialog title="新增功能" width="60%" center
    :visible.sync="addFunctionVisible"
    :before-close="hide">

    <div>
      <el-form ref="form" :model="option" label-width="80px">
        <el-form-item label="功能ID">
          <el-input v-model="option.id" placeholder="请输入英文或数字"></el-input>
        </el-form-item>
        
        <el-form-item label="启动条件">
          <ul>
            <!-- <li v-for="condition in option.conditions"></li> -->
          </ul>
          <div>
          <!-- 条件ID -->
            <el-select v-model="form.region" placeholder="请选择功能ID">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            =
            <!-- 条件Value -->
            <el-select v-model="form.region" placeholder="请选择功能Value">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>

            <el-button type="danger">删除</el-button>
          </div>
          <div>
          <!-- 条件ID -->
            <el-select v-model="form.region" placeholder="请选择功能ID">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            =
            <!-- 条件Value -->
            <el-select v-model="form.region" placeholder="请选择功能Value">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>

            <el-button type="success">添加</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="hide">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      form: {
        region: false,
      },
      addFunctionVisible: false,
      option: {
        id: '',
        conditions: [],
        values: [],
      },
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
    show() {
      this.addFunctionVisible = true;
    },
    hide() {
      this.addFunctionVisible = false;
    },
  },
  components: {

  },
};
</script>

<style scoped lang="scss">

</style>
