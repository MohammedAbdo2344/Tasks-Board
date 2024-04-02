import React from 'react'
import logo from "../assets/46742.png"

const Header = () => {
    return (
        <div className='flex flex-row justify-center items-center uppercase text-2xl font-bold'>
            <h1>Tasks Board </h1><img className='w-16' src={logo}/>
        </div>
    )
}

export default Header