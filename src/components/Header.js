import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  display: table;
  padding: 32px;
  width: 100%;
  background-color: #000;
`

const NavLink = styled(Link)`
  
`

export default function Header() {
  return (
    <Nav>
      <Link className='dtc w-60 link dim black b f6 f5-ns dib mr3 white' to='/' title='Home'>Alvin Miftah</Link>	
    </Nav>
  )
}