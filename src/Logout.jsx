import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserLoggedin } from './App';


const Logout = () => {
    const history = useHistory();
    const { dispatch } = useContext(UserLoggedin);

    const doLogout = async () => {

        const res = await fetch('/logout', {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            credentials: "include"
        });
        localStorage.clear();
        if (res.status === 200) {
            dispatch({ type: 'LOGIN', value: false });
            history.push('/');
        } else {
            history.push('/error');
        }

    }

    useEffect(() => {
        doLogout();
        // eslint-disable-next-line
    }, []);

    return (
        <>
        </>
    )
}

export default Logout;