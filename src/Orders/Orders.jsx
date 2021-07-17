import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import HCard from './HCard';
import FastFood from '../Food-Data/FastFood/FastFood';
import Pizza from '../Food-Data/Pizza/Pizza';
import LunchNDinner from '../Food-Data/LunchNDinner/LunchNDinner';
import './Orders.css';

const Orders = () => {
    const history = useHistory();
    const callOrder = async () => {
        try {
            const res = await fetch('/cart', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: "include"
            });
            const data = await res.json();
            if (res.status === 400) {
                history.push('/login');
            } else {
                createOrder(JSON.parse(data).orders);
            }

        } catch (err) {
            history.push('/Error');
        }
    }
    const createOrder = (order) => {
        for (let i = order.length - 1; i >= 0; i--) {
            const element = order[i];
            let props = {};
            props.prop = (element.id <= 9 ? FastFood[element.id - 1] : (element.id <= 18 ? Pizza[element.id - 10] : LunchNDinner[element.id - 19]));
            props.quantity = element.quantity;
            const date = Date.parse(element.date);
            const time = (Date.now() - date) / (1000 * 60);
            if (time <= 30) {
                props.message = `Order will be delivered in ${Math.floor(30 - time)} minutes...`;
                props.status = "In Progress";
            } else {
                const newDate = new Date(date + 30 * 60 * 1000);
                props.message = `Order was delivered at ${newDate}`;
                props.status = "Delivered";
            }
            const childHcard = document.createElement('div');
            const idName = 'childHcard' + String(i)
            childHcard.id = idName;
            document.getElementById('hcards2').appendChild(childHcard);
            ReactDOM.render(<HCard key={i} props={props} />, document.getElementById(idName));
        }
        if (order.length === 0) {
            const heading = document.createElement('h3');
            heading.classList.add('display-4');
            heading.innerText = 'No orders found !'
            heading.style.textAlign = 'center';
            document.getElementById('hcards2').appendChild(heading);
        }
    }

    useEffect(() => {
        callOrder();
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className="ord">
                <div className="oitem">
                    <h1 className="display-4">Your&nbsp;Orders&nbsp;:&nbsp;</h1>
                    <hr />
                    <div className="onProgress">
                        <div className="hcards2" id="hcards2">
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Orders;