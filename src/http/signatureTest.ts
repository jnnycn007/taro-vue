import md5 from 'md5'
const secret = '4b6fab7c41c8ad8a17cf36d4ed9dc72a'
export const appkeyTest = 'collect_wet_c937d9'
// const secret = '12345secret'
// export const appkeyTest = '12345appkey'

export function getSigncodeTest (params: any, type: string) {
  let str = ''
  if (Object.prototype.toString.call(params) === '[object FormData]') {
    const obj = params.keys()
    const arr: string[] = []
    for (const b of obj) {
      arr.push(b)
    }
    arr.sort()
    arr.forEach(keys => {
      if ((typeof params.get(keys) === 'string') || (typeof params.get(keys) === 'number')) {
        str += keys
        str += params.get(keys)
      }
    })
  } else {
    const objectKeyArr = Object.keys(params)
    objectKeyArr.sort()
    objectKeyArr.forEach(keys => {
      if (type === 'get') {
        if (Array.isArray(params[keys])) {
          // console.log(params[keys])
        } else if (typeof params[keys] === 'object') {
          str += keys
          str += JSON.stringify(params[keys])
        } else {
          str += keys
          str += params[keys]
        }
      } else {
        if ((typeof params[keys] === 'string') || (typeof params[keys] === 'number')) {
          str += keys
          str += params[keys]
        }
      }
    })
  }
  str = secret + str + secret
  str = md5(str.toUpperCase())
  return str
}
