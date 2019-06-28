import BScroll from 'better-scroll'

export default {
  props: {
    betterScrollOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data () {
    return {
      BS: null
    }
  },
  mounted () {
    this.scrollInit()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    scrollInit () {
      if (this.$refs.wrapper.children.length) {
        this.BS = new BScroll(this.$refs.wrapper, Object.assign({
          mouseWheel: true,
          scrollbar: {
            fade: true,
            interactive: false
          }
        }, this.betterScrollOptions))
      }
    },
    scrollDestroy () {
      if (this.BS) {
        this.BS.destroy()
      }
    }
  }
}
