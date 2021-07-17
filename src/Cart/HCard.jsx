import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
const HCard = (prop) => {
    const history = useHistory();
    const [quantity, setQuantity] = useState(prop.value);
    const props = prop.props;
    const Delete = async () => {
        const res = await fetch('/removeItem', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ "id": props.id }),
            credentials: "include"
        });
        if (res.status === 200) {
            window.location.reload();
        } else {
            history.push('/error');
        }
    }
    return (
        <>
            <div className="hcard">
                <div className="hcards_img">
                    <img src={props.img} alt={props.name} />
                </div>
                <div className="part1">
                    <h5 className="display-6">{props.name}</h5>
                    <p className="display-7">
                        <i className="fas fa-rupee-sign"></i> {props.price}
                    </p>
                </div>
                <div className="part2">
                    <p className="qty">Quantity</p>
                    <IconButton aria-label="remove" onClick={() => {
                        setQuantity(Math.max(1, quantity - 1));
                        prop.onChange(props.id2, Math.max(1, quantity - 1), props.len);
                    }}>
                        <RemoveIcon />
                    </IconButton>
                    <span>{quantity}</span>
                    <IconButton aria-label="add" onClick={() => {
                        setQuantity(quantity + 1);
                        prop.onChange(props.id2, quantity + 1, props.len);
                    }}>
                        <AddIcon />
                    </IconButton>
                </div>
                <div className="delete">
                    <IconButton style={{ "color": "red" }} aria-label="delete" onClick={Delete} >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default HCard;