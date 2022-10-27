import React, { useEffect, useState } from 'react'
import './header.scss'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  const toHome = () => {
    history.replace('/')
  }

  return <div className="doc-header"></div>
}

export default Header
