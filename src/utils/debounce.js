// 0.基本功能
// 1.立即执行（在每一次开始的时候先立即执行一次）
// 2.取消按钮
// 3.获取返回值

/**
 * zjc节流函数
 * @param {*} listenFn 监听函数
 * @param {Number} delay 延迟时间
 * @param {Boolean} immediate 是否立即执行依次
 * @param {Function} resultCallback 用于获取函数返回值的回调函数
 * @returns
 */
export default function _debounce(
  listenFn,
  delay = 500,
  immediate = false,
  resultCallback = () => {}
) {
  if (
    typeof listenFn !== 'function' ||
    typeof delay !== 'number' ||
    typeof immediate !== 'boolean' ||
    typeof resultCallback !== 'function'
  )
    throw new Error('arguments error')
  let timer = null
  let isInvoke = true
  function debounce(...args) {
    if (immediate && isInvoke) {
      const result = listenFn.apply(this, args)
      if (resultCallback) resultCallback(result)
      isInvoke = false
      return
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      const result = listenFn.apply(this, args)
      if (resultCallback) resultCallback(result)
      timer = null
      isInvoke = true
    }, delay)
  }
  debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
    isInvoke = true
  }
  return debounce
}
