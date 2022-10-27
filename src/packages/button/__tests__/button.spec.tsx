import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Button } from '../button'

test('should match snapshot', () => {
  const { asFragment } = render(<Button />)
  expect(asFragment()).toMatchSnapshot()
})
