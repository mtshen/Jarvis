<template>
  <div>
    <el-tooltip effect="dark" content="github" placement="bottom">
      <a class="d2-ml-0 d2-mr btn-text can-hover"  target="_blank" :href="github">
        <d2-icon name="github" style="font-size: 20px"/>
      </a>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data () {
    return {
      github: 'https://github.com/mtshen'
    }
  }
}
</script>
