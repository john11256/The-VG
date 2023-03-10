import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {FaStar} from "react-icons/fa";
import { ratingProm } from "../actions/actions";
import './Rating.css'

export default function Rating2 ({id}) {
    const dispatch = useDispatch();
    const [rating,setRating] = useState();

    const detail = useSelector((state) => state.detail);

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