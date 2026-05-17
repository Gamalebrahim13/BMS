import  { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

export default function Navbar() {
    const{loginData}=useContext(AuthContext)!;
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg border border-gray-100">
        
        
        </div>
  )
}
