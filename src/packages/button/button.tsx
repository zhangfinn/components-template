import React, { FunctionComponent } from 'react'
import './button.scss'

export interface ButtonProps {
  name: string
}
const defaultProps = {} as ButtonProps
export const Button: FunctionComponent<Partial<ButtonProps>> = (props) => {
  const { name } = { ...defaultProps, ...props }
  return <div>Button</div>
}

Button.defaultProps = defaultProps
Button.displayName = 'Button'
