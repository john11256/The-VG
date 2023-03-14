import React from "react";
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../actions/actions';
import { useEffect } from "react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import Rating2 from "./Rating";
import Rating from "react-rating";
import './Detail.css'


 
export default function Detail(){
    const dispatch = useDispatch();
    const {id} = useParams();

    const starsState = useSelector((state) => state.stars);
    const detail = useSelector((state) => state.detail);

    const ratingState = [detail.rating]
    const concat = ratingState.concat(starsState)
    // console.log(concat);
    const rating2 =concat.reduce((a,b)=> a+b)/concat.length;
    // console.log(rating2);

    useEffect(() => {
        dispatch(getDetail(id));   
    },[id, dispatch]);

    return (
        <div className="card3" >
                <h1>{detail.name}</h1>
                <img className="image2" src = {detail.image} alt = "img not found" width="200px" height="250px" />
                <a>Released: {detail.released? detail.released:'Not defined'}</a>
                <Rating
                initialRating={rating2}
                emptySymbol={<BsStar />}
                fullSymbol={<BsStarFill />}
                halfSymbol={<BsStarHalf />}
                readonly={true}
                color = {"#ffc107"}
                />
                <a>Genres: {detail.genres2 + ' ' }</a>
                <a>Platforms: {detail.platforms2 + ' '}</a>
                 <Rating2/>
                <Link to = '/home'> <button className="button3" >Back</button></Link>
         </div>   
    )

}
