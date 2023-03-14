import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {FaStar} from "react-icons/fa";
import { ratingProm, getDetail } from "../actions/actions";
import './Rating.css'

export default function Rating2 ({}) {
    const dispatch = useDispatch();
    const [rating,setRating] = useState();
    const [input, setInput] = useState();
    const theDetail = useSelector((state) => state.detail)

    function handlePuntuation (e){
        setInput(
            [...input,e.taret.value]
        )
    }
    console.log(input);

    const handleStars = (e) => {
        const stars = parseInt(e.target.value);
        dispatch(ratingProm(stars))
    };

        return(
            <div>
                <div>
                {[...Array(5)].map((star,i) => {
                    const ratingValue = i+1;
                   return (
                        <label>
                        <input
                            type="radio"
                            className="rating"
                            value ={ratingValue}
                            onClick={(e) => {
                                handleStars(e)
                                setRating(ratingValue)
                            }
                            }
                        />
                        <FaStar
                            size ={20}
                            color={ratingValue <=  rating ? "#ffc107" : "#e4e5e9"}  
                        />
                        </label>
                   )
                })}
                </div>
            </div>
            
        )
    
}