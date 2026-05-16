import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

export default function Navbar() {
    const{loginData}=useContext(AuthContext)!;
  return (
    <div>{loginData?.userName}</div>
  )
}
