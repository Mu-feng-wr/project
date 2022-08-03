<template>
  <el-input
    v-model="inputValue"
    :clearable="clearable"
    class="el-text-right"
    :disabled="disabled"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :readonly="readonly"
    @change="handleChange"
    @clear="handleClear"
  />
</template>

<script>
import { fmoney, DELMoneyFormat } from '@/utils'
export default {
  name: 'MoneyInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    precision: { // 定义几位小数
      type: Number,
      default: 2
    },
    clearable: { // 是否允许清空
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 512
    },
    readonly: { // 只读
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: null
    }
  },
  watch: {
    value() {
      if (isNaN(parseFloat(this.value))) {
        this.inputValue = null
      } else {
        this.inputValue = fmoney(this.value, this.precision)
      }
    }
  },
  created() {
    if (isNaN(parseFloat(this.value))) {
      this.inputValue = null
    } else {
      this.inputValue = fmoney(this.value, this.precision)
    }
  },
  methods: {
    handleChange(val) {
      let number = parseFloat(DELMoneyFormat(val))
      if (isNaN(number)) {
        if (val.trim() === '') {
          console.log('')
        } else if (isNaN(parseFloat(this.value))) {
          number = null
        } else {
          number = parseFloat(this.value)
        }
      }
      number = parseFloat(number)
      this.inputValue = isNaN(number) ? null : fmoney(number, this.precision)
      this.$emit('change', isNaN(number) ? null : number)
    },
    handleClear(e) {
      this.inputValue = null
      this.$emit('change', null)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-text-right{
    ::v-deep .el-input__inner{
      text-align: right;
    }
  }
</style>
