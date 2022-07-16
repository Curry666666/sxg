import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 引入中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (filed) => `${filed}必须与密码相同`
    },
    // 把字段改为中文
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})
VeeValidate.Validator.extend('agree', {
    validate: (value) => {
        return value
    },
    getMessage: (filed) => filed + '必须同意'
})