const handler = (str) => {
  let feng = ``
  let arr = str.split(`-`)
  let newArr = arr.map((ele, idx) => {
    return ele[0].toUpperCase() + ele.slice(1)
  })
  feng = newArr.join(``)
  return feng
}

var demoModel = function (name) {
  const upperName = handler(name)
  var temp = {
    demo: `import React from 'react'
import { ${upperName} } from './${name.toLowerCase()}'

const ${upperName}Demo = () => {
  return (
    <>
      <div className="demo">
        <h2>基础用法</h2>
        <${upperName} />
      </div>
    </>
  )
}

export default ${upperName}Demo
`,

    index: `import { ${upperName} } from './${name.toLowerCase()}'

export default ${upperName}
`,

    test: `import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ${upperName} } from '../${name.toLowerCase()}'

test('should match snapshot', () => {
  const { asFragment } = render(<${upperName} />)
  expect(asFragment()).toMatchSnapshot()
})
`,
    react: `import React, { FunctionComponent } from 'react'
import './${name.toLowerCase()}.scss'

export interface ${upperName}Props {
  name: string
}
const defaultProps = {} as ${upperName}Props
export const ${upperName}: FunctionComponent<Partial<${upperName}Props>> = (props) => {
  const { name } = { ...defaultProps, ...props }
  return <div>${upperName}</div>
}

${upperName}.defaultProps = defaultProps
${upperName}.displayName = '${upperName}'
`,
    doc: `### 介绍

基于 xxxxxxx

### 安装

${''}

## 代码演示

### 基础用法1



## API

### Props

| 参数         | 说明                             | 类型   | 默认值           |
|--------------|----------------------------------|--------|------------------|
| name         | 图标名称或图片链接               | String | -                |
| color        | 图标颜色                         | String | -                |
| size         | 图标大小，如 '20px' '2em' '2rem' | String | -                |
| class-prefix | 类名前缀，用于使用自定义图标     | String | 'nutui-iconfont' |
| tag          | HTML 标签                        | String | 'i'              |

### Events

| 事件名 | 说明           | 回调参数     |
|--------|----------------|--------------|
| click  | 点击图标时触发 | event: Event |
`,
  }

  return temp
}
module.exports = demoModel
