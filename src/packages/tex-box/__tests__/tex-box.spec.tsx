import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { TexBox } from '../tex-box'

test('should match snapshot', () => {
  const { asFragment } = render(<TexBox />)
  expect(asFragment()).toMatchSnapshot()
})
