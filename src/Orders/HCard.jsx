import React from 'react';
import './Orders.css';
const HCard = (props) => {
    props = props.props;
    return (
        <>
            <div className="hcard2">
                <div className="hcards2_img">
                    <img src={props.prop.img} alt={props.prop.name} />
                </div>
                <div className="part12">
                    <h5 className="display-6">{props.prop.name}</h5>
                    <p className="display-7">
                        <i className="fas fa-rupee-sign"></i> {props.prop.price}
                    </p>
                </div>
                <div className="part22">
                    <p><strong><em>{props.status}</em></strong></p>
                </div>
                <div className="delete2">
                    <p>X&nbsp;{props.quantity}</p>
                </div>
                <div className="message">
                    <p>
                        {props.message}
                    </p>
                </div>
            </div>
        </>
    )
}

export default HCard;