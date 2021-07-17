import React from 'react';
import { NavLink } from 'react-router-dom';

const cardStyle = {
    width: "20rem"
};


const Card = (props) => {
    props = props.props;
    return (
        <>
            <div className="card" style={cardStyle}>
                <NavLink to={`/item/${props.id}/${props.catagory}`}>
                    <img src={props.img} className="card-img-top" alt={props.name} />
                    <div className="card-body">
                        <p className="card-text">
                            <strong>
                                {props.name}
                            </strong>
                        </p>
                        <p>
                            <em>
                                <i className="fas fa-rupee-sign"></i>{props.price}
                            </em>
                        </p>
                    </div>
                </NavLink>
            </div>

        </>
    )
}
export default Card;