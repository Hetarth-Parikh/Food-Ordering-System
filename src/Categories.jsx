import React from 'react';
import { useParams } from 'react-router';
import Card from './Food-Cards/Card';
import FastFood from './Food-Data/FastFood/FastFood';
import Pizza from './Food-Data/Pizza/Pizza';
import LunchNDinner from './Food-Data/LunchNDinner/LunchNDinner';
import './Food-Cards/Cards.css';

const headingStyle={
    "backgroundColor": "white",
    "paddingBottom":"13px"
}

const Categories = () => {
    const props = useParams();
    let result = []
    for (let i = 0; i < FastFood.length; i++) {
        if (props.name === 'Fast Food')
            result.push(<Card key={i} props={FastFood[i]} />)
        else if (props.name === 'Pizza')
            result.push(<Card key={i+9} props={Pizza[i]} />)
        else if (props.name === 'Lunch N Dinner')
            result.push(<Card key={i+18} props={LunchNDinner[i]} />)
    }
    return (
        <>
            <div className="myCard-container"></div>
            <h1 className="text-center display-4" style={headingStyle}>
                Category : <span> {props.name} </span>
            </h1>
            <div className="myCard-container">
                {result}
            </div>

        </>
    )
}
export default Categories;