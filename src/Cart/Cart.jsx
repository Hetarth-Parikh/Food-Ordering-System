import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import HCard from './HCard';
import FastFood from '../Food-Data/FastFood/FastFood';
import Pizza from '../Food-Data/Pizza/Pizza';
import LunchNDinner from '../Food-Data/LunchNDinner/LunchNDinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';


const Cart = () => {
    const history = useHistory();
    const [useMessage, setMessage] = useState('');
    const [userName, setUserName] = useState();
    const [userPhone, setUserPhone] = useState();
    const [visited, setVisited] = useState(false);
    const [qty, setQty] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState();
    const callCart = async () => {
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
            setUserName(JSON.parse(data).name);
            setUserPhone(JSON.parse(data).phone);
            if (res.status === 400) {
                history.push('/login');
            } else {
                const cart = JSON.parse(data).cart;
                createCart(cart);
            }

        } catch (err) {
            history.push('/Error');
        }
    }
    const handleChange = (id, newQty, len) => {
        let Q = qty;
        qty[id] = newQty;
        setQty(Q);
        const tdId = 'qty' + String(id);
        let qtyTd = document.getElementById(tdId);
        qtyTd.innerText = qty[id];
        calculateTotal(len);
    }

    const createCart = (cart) => {
        if (cart.length === 0) {
            setMessage('Your Cart is empty');
        } else {
            setMessage('Your Cart : ');
            for (let i = 0; i < cart.length; i++) {
                let element = cart[i];
                let prop = (element.id <= 9 ? FastFood[element.id - 1] : (element.id <= 18 ? Pizza[element.id - 10] : LunchNDinner[element.id - 19]));
                prop.id = element.id;
                prop.id2 = i;
                prop.len = cart.length;
                const childHcard = document.createElement('div');
                const idName = 'childHcard' + String(element.id)
                childHcard.id = idName;
                document.getElementById('hcards').appendChild(childHcard);
                if (!visited) {
                    const tBody = document.getElementById('tBody');
                    let html = tBody.innerHTML;
                    const fdName = 'fd' + String(i);
                    const qtyName = 'qty' + String(i);
                    const prName = 'pr' + String(i);
                    const elemId = 'elem' + String(element.id);
                    html += `<tr id=${elemId}>
                    <td id=${fdName}>${prop.name}</td>
                    <td id=${qtyName}>1</td>
                    <td id=${prName}>${prop.price}</td>
                    </tr>`;
                    tBody.innerHTML = html;
                    setVisited(true);
                    let Q = qty;
                    Q.push(1);
                    setQty(Q);
                }
                ReactDOM.render(<HCard key={element.id} props={prop} value={qty[i]} onChange={handleChange} />, document.getElementById(idName));
            }
            calculateTotal(cart.length);
        }
    }
    const calculateTotal = (len) => {
        let res = 0;
        for (let i = 0; i < len; i++) {
            let price = Number(document.getElementById('pr' + String(i)).innerText);
            let quantity = Number(document.getElementById('qty' + String(i)).innerText);
            res += price * quantity;
        }
        setTotal(res);
    }
    useEffect(() => {
        callCart();
        // eslint-disable-next-line
    }, []);

    const updateAddress = (e) => {
        setAddress(e.target.value);
    }

    const placeOrder = async () => {
        if (!address) {
            toast.error("Enter your address.");
            return;
        }
        const len = document.getElementsByTagName('tr').length - 1;
        if (len === 0) {
            toast.error("Please add item into cart.");
            return;
        }
        let order = [];
        for (let i = 0; i < len; i++) {
            const id = Number(document.getElementsByTagName('tr')[i + 1].id.substr(4));
            const name = document.getElementById('fd' + String(i)).innerText;
            const quantity = Number(document.getElementById('qty' + String(i)).innerText);
            const price = Number(document.getElementById('pr' + String(i)).innerText);
            order.push({ id, name, quantity, price });
        }

        const res = await fetch('/placeOrder', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ "address": address, "orders": order }),
            credentials: "include"
        });

        if (res.status === 400) {
            toast.error("Something went wrong. Try again!");
        } else {
            toast.success("Order successful");
        }
    }

    return (
        <>
            <div className="cart">
                <div className="cartitem">
                    <h1 className="display-4">{useMessage}</h1>
                    <hr />
                    <div className="hcards" id="hcards">
                    </div>
                </div>
                <div className="orderDetails">
                    <h1 className="display-6">Order Details&nbsp;:&nbsp;</h1>
                    <hr />
                    <p> Name&nbsp;:&nbsp;{userName}</p>
                    <p> Phone&nbsp;:&nbsp;{userPhone}</p>
                    <div style={{ display: "flex" }}>
                        <label htmlFor="Address">Address&nbsp;:</label>

                        <textarea name="address" id="address" cols="20" rows="3" value={address} placeholder="Enter your address ..." onChange={updateAddress}></textarea>
                    </div>

                    <p style={{ textDecoration: "underline" }}> <strong>Order Summary&nbsp;:&nbsp;</strong></p>
                    <table className="table table-striped table-hover table-bordered border-primary">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Food Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody id='tBody'></tbody>
                    </table>
                    <hr style={{ margin: "0", padding: "0" }} />
                    <p style={{ textAlign: "right" }}>Totla :  <i className="fas fa-rupee-sign"></i> {total}</p>
                    <p>
                        <strong>
                            Payment Option :
                        </strong>
                    </p>
                    <p>
                        <em>
                            <i className="fas fa-money-bill-wave"></i>
                            &nbsp;&nbsp;Cash on delivery
                        </em>
                    </p>
                    <div className="place">
                        <button className="btn btn-primary" onClick={placeOrder}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Cart;