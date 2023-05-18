const formRules = {
  email: [
    { required: true, message: '请填写邮箱' },
    { type: 'email', message: '请填写正确的邮箱' }
  ],
  password: [
    { required: true, message: '请填写密码' },
    { minLength: 6, message: '密码名不少于6个字符' }
  ],
  nickname: [
    { required: true, message: '请填写昵称' },
    { maxLength: 10, message: '昵称不大于10个字符' },
    {
      validator(val, cb) {
        if (!/^[^ ]+$/.test(val)) cb('不能包含空格')
      }
    }
  ],
  code: [{ required: true, message: '请填写验证码' }]
}

// 解构导出，并对属性重命名
export const {
  email: emailRule,
  password: passwordRule,
  nickname: nicknameRule,
  code: codeRule
} = formRules
