import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserLoggedin } from '../App';

const Right = () => {

    const { state } = useContext(UserLoggedin);
    const history = useHistory();

    const [search, setSearch] = useState('');

    const UpdateSearch = (e) => {
        setSearch(e.target.value);
    }
    
    const Search = () => {
        if (search !== '') {
            setSearch('');
            history.push(`/search/ ${search}`);
        }
    }

    return (
        <>
            <div className="navbar-right">
                <div className="searchbox">
                    <i className="search-icon-left"></i>
                    <input type="text" placeholder="Search" name="search" value={search} onChange={UpdateSearch} autoComplete="off"/>
                    <i className="fas fa-search search-icon-right" onClick={Search}></i>
                </div>
                <div className="bts">
                    {(state ?
                        <NavLink exact to='/logout' activeClassName="active_link">
                            <button className="btn"> Logout </button>
                        </NavLink>
                        :
                        <>
                            <NavLink exact to='/login' activeClassName="active_link">
                                <button className="btn"> Login </button>
                            </NavLink>
                            <NavLink exact to='/signup' activeClassName="active_link">
                                <button className="btn"> Register </button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
export default Right;