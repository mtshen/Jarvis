<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
@font-face {
  font-family: 'jarvisfont';  /* project id 607247 */
  src: url('//at.alicdn.com/t/font_607247_errzr3ilmf.eot');
  src: url('//at.alicdn.com/t/font_607247_errzr3ilmf.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_607247_errzr3ilmf.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_607247_errzr3ilmf.woff') format('woff'),
  url('//at.alicdn.com/t/font_607247_errzr3ilmf.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_607247_errzr3ilmf.svg#jarvisfont') format('svg');
}
</style>
