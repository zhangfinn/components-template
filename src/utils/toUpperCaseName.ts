export default (str: string) => {
  let feng = ``
  const arr = str.split(`-`)
  const newArr = arr.map((ele, idx) => {
    return ele[0].toUpperCase() + ele.slice(1)
  })
  feng = newArr.join(``)
  return feng
}
