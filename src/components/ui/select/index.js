export default {
  name: 'ui-select',
  props: {
    'model': {
      required: true
    },
    'options': {
      required: true
    },
    'isLoading': {
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    updateMessage (e) {
      if (e.target.value.length < 3) {
        return
      }
      this.$emit('onInput', e.target.value)
    },
    deleteMessage (e) {
      this.$emit('onInput', e.target.value)
    },
    clickEvent (e) {
      this.$emit('onSelect', e)
    }
  }
}
