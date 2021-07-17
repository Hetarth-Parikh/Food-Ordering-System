import React from 'react';
import { NavLink } from 'react-router-dom';
const Middle = () => {
    return (
        <>
            <div className="navbar-middle">
                <li>
                    <NavLink exact to='/' activeClassName="active_link">
                        Home
                    </NavLink>
                </li>
                <div className="btn-group dropdown">
                    <button className="btn catagories" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                        <NavLink to='/categories' activeClassName="active_link">
                            Categories
                        </NavLink>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                        <li>
                            <NavLink to='/categories/Fast Food' className="dropdown-item">
                                Fast Food
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/categories/Pizza' className="dropdown-item">
                                Pizza
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/categories/Lunch N Dinner' className="dropdown-item">
                                Lunch N Dinner
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <li>
                    <NavLink exact to='/cart' activeClassName="active_link">
                        View&nbsp;Cart
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to='/orders' activeClassName="active_link">
                        View&nbsp;Orders
                    </NavLink>
                </li>
            </div>
        </>
    )
}
export default Middle;