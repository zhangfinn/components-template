import React, { FunctionComponent } from 'react'
import './tex-box.scss'

export interface TexBoxProps {
  name: string
}
const defaultProps = {} as TexBoxProps
export const TexBox: FunctionComponent<Partial<TexBoxProps>> = (props) => {
  const { name } = { ...defaultProps, ...props }
  return <div>TexBox</div>
}

TexBox.defaultProps = defaultProps
TexBox.displayName = 'TexBox'
