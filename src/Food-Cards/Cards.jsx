import React from 'react';
import Card from './Card';
import FastFood from '../Food-Data/FastFood/FastFood';
import Pizza from '../Food-Data/Pizza/Pizza';
import LunchNDinner from '../Food-Data/LunchNDinner/LunchNDinner';
import './Cards.css';


const Cards = () => {
    let result = []
    for (let i = 0; i < FastFood.length; i++) {
        result.push(<Card key={i} props={FastFood[i]} />)
        result.push(<Card key={i+9} props={Pizza[i]} />)
        result.push(<Card key={i+18} props={LunchNDinner[i]} />)
    }
    return (
        <>
            <div className="myCard-container">
                {result}
            </div>

        </>
    )
}

export default Cards;