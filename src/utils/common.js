
// 时间格式化
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time == 'object') {
    date = time
  } else {
    date = new Date(time)
  }
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  var timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}
// 克隆
export function clone(Obj) {
  var buf
  if (Obj instanceof Array) {
    buf = [] // 创建一个空的数组
    var i = Obj.length
    while (i--) {
      buf[i] = clone(Obj[i])
    }
    return buf
  } else if (Obj instanceof Object) {
    buf = {} // 创建一个空对象
    for (var k in Obj) { // 为这个对象添加新的属性
      buf[k] = clone(Obj[k])
    }
    return buf
  } else {
    return Obj
  }
}
