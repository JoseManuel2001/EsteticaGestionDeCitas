import React from 'react'
import './Styles/Header.css'
import { UserContext } from './UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImUser } from 'react-icons/im'
import { FiLogOut } from 'react-icons/fi'
import { MdArrowBack } from 'react-icons/md'

function Header({ title, desc, returnTo, permBack }) {


    const { logout, user } = useContext(UserContext)
    const Navigate = useNavigate()
  

    const handleClickLogout = () => {
        logout()
        Navigate('/')
    }

    const handleClickReturn = () => {
        Navigate(returnTo)
    }

    return (
        <div className='divHeader'>
            <div className='divBack'>
                {permBack ? <button className='btnBack' onClick={handleClickReturn}>
                    <MdArrowBack className='iconBack' />
                    <p>Atras</p>
                </button> : <div></div>}
            </div>
            <div className='titulo'>
                <p className='title'>
                    <b>{title}</b>
                </p>
                <p className='desc'>{desc}</p>
            </div>
            <div className='divLogout'>
                <button className='btnLogout' onClick={handleClickLogout}>
                    <article className='iconoUser'>
                        <ImUser className='icono' />
                    </article>
                    <p className='user'>
                        <b>{user.Nombre} | cerrar sesion</b>
                    </p>
                    <FiLogOut />
                </button>
            </div>
        </div>

    )
}

export default Header