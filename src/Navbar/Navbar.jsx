import React from 'react';
import './Navbar.css';
import Left from './Left';
import Middle from './Middle';
import Right from './Right';


const Navbar=()=>{
    return (
        <>
            <div className="navbar">
                <Left/>
                <Middle/>
                <Right/>
            </div>
        </>
    )
}

export default Navbar;