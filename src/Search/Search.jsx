import React from 'react';
import { useParams } from 'react-router';
import Card from '../Food-Cards/Card';
import FastFood from '../Food-Data/FastFood/FastFood';
import Pizza from '../Food-Data/Pizza/Pizza';
import LunchNDinner from '../Food-Data/LunchNDinner/LunchNDinner';
import '../Food-Cards/Cards.css';

const headingStyle = {
    "backgroundColor": "white",
    "paddingBottom": "13px"
}

const CheckPreent = (x, y) => {
    x = x.trim();
    y = y.trim();
    for (let i = 0; i + x.length - 1 < y.length; y++) {
        if (y.substr(i, x.length) === x) {
            return true;
        }
    }
    return false;
}

const Search = () => {
    const { name } = useParams();
    let result = []
    for (let i = 0; i < FastFood.length; i++) {
        let temp = [];
        temp.push(FastFood[i].name.toLowerCase());
        temp.push(FastFood[i].catagory.toLowerCase());
        temp.push(Pizza[i].name.toLowerCase());
        temp.push(Pizza[i].catagory.toLowerCase());
        temp.push(LunchNDinner[i].name.toLowerCase());
        temp.push(LunchNDinner[i].catagory.toLowerCase());
        for (let j = 0; j < temp.length; j++) {
            if (CheckPreent(name.toLowerCase(), temp[j])) {
                if (j === 0 || j === 1) {
                    result.push(<Card key={i} props={FastFood[i]} />)
                    j = 1;
                } else if (j === 2 || j === 3) {
                    result.push(<Card key={i + 9} props={Pizza[i]} />)
                    j = 3;
                } else {
                    result.push(<Card key={i + 18} props={LunchNDinner[i]} />)
                    j = 5;
                }
            }
        }
    }
    return (
        <>
            <div className="myCard-container"></div>
            <h1 className="text-center display-4" style={headingStyle}>
                <span> {(result.length === 0) ? "No results found" : `${result.length} results found`} </span>
            </h1>
            <div className="myCard-container">
                {result}
            </div>

        </>
    )
}
export default Search;