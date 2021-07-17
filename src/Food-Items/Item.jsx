import React from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import FastFood from '../Food-Data/FastFood/FastFood';
import Pizza from '../Food-Data/Pizza/Pizza';
import LunchNDinner from '../Food-Data/LunchNDinner/LunchNDinner';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Item.css'
const Item = () => {
    const props = useParams();
    const history = useHistory();
    const containerStyle = { width: window.innerWidth, height: window.innerHeight - 60 };
    const item = (props.catagory === 'Fast Food' ? FastFood[props.id - 1] : (props.catagory === 'Pizza' ? Pizza[props.id - 1] : LunchNDinner[props.id - 1]));
    let rating = Math.max(2, Math.floor(Math.random() * 5));
    let Rating = [];
    for (let i = 0; i < 5; i++) {
        if (rating > 0)
            Rating.push(<span className="fa fa-star checked" key={i}></span>);
        else
            Rating.push(<span className="fa fa-star" key={i}></span>);
        rating--;
    }
    const addItem = async () => {
        try {
            const res = await fetch('/addItem', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ "props": item }),
                credentials: "include"
            });
            const data = await res.json();
            if (res.status === 400) {
                toast.info(data.message, {
                    position: "top-right",
                    style: { "fontFamily": "Heebo" }
                });
            }
            else {

                toast.success(data.message, {
                    position: "top-right",
                    style: { "fontFamily": "Heebo" }
                });
            }
        } catch (err) {
            history.push('/Error');
        }
    }
    return (
        <>
            <div className="itemClass" style={containerStyle}>
                <div className="image">
                    <img src={item.img} alt={item.name} />
                </div>
                <div className="vertical_line"></div>
                <div className="details">
                    <p className="display-3">{item.name}</p>
                    <p className="display-7">Category : {item.catagory}</p>
                    <p className="display-7">MRP : <i className="fas fa-rupee-sign"></i> {item.price}</p>
                    <p className="display-7">Rating :{Rating}</p>
                    <button className="btn btn-primary btn-lg" style={{ "marginTop": "1rem" }} onClick={addItem}>
                        Add to Cart <ShoppingCartIcon />
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Item;