const formRules = {
  username: [
    { required: true, message: '请填写用户名' },
    { minLength: 6, message: '用户名不少于6个字符' },
    {
      validator(val, cb) {
        if (!/^[A-Za-z0-9_@.]+$/.test(val)) cb('账户格式错误')
      }
    }
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
  ]
}

// 解构导出，并对属性重命名
export const { username: usernameRule, password: passwordRule, nickname: nicknameRule } = formRules
