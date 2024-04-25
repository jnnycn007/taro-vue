import md5 from 'md5'

const secretProd = '12345secret'
const appkeyProd = '12345appkey'
const secretTest = '4b6fab7c41c8ad8a17cf36d4ed9dc72a'
const appkeyTest = 'collect_wet_c937d9'
// const secretTest = '12345secret'
// export const appkeyTest = '12345appkey'

const isProd = process.env.NODE_ENV === 'production'
const appkey = isProd ? appkeyProd : appkeyTest
const secret = isProd ? secretProd : secretTest
function getSigncode (params: any, type: string) {
  let str = ''
  if (params instanceof FormData) {
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
export { appkey, getSigncode }
