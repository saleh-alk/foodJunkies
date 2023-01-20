import './PostIndexItem.css';


import { deletePost} from '../../store/post';
import { NavLink } from "react-router-dom";


import {ShoppingCartOutlined} from "@ant-design/icons"
import _ from "lodash"

import {Badge} from "antd"




import { Link, useHistory } from 'react-router-dom';
import { addLike, removeLike } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';




const PostIndexItem = ({ post, key1, updateSidebarContent }) => {

    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user._id)
    const history = useHistory()
    
    
   


    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const handleClick = (post) => {
        
        dispatch(deletePost(post._id, key1))
    }
    const editDeleteButton = (post) => {
        if (currentUser._id === post.author._id){
            return(
                <>
                <div>
                    <NavLink to ={{pathname: `/${post._id}/edit`}}><button className="EditDeleteButton">Edit</button></NavLink>
                    <button onClick={()=> handleClick(post)} className="EditDeleteButton">Delete</button>
                </div>
                </>
            )
        }
    }

   


    const {cart} = useSelector((state) => ({...state}));



    // console.log(cart)
    const handleAddToCart = () => {
        let cart = []
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            cart.push({
                post,
                quantity: 1
            });
            // let unique = _.uniqWith(cart, _.isEqual)
            localStorage.setItem('cart', JSON.stringify(cart));

            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            })
        }
    }
//


        let p = post.price


    return (
        <li className='post-container'>
            <div className='post-main-content'>


                <span className='post-info-span'>
                    <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link> - {convertDate(post.createdAt)}</span>
                    <br/>
                <p className='post-body-text'>{post.body}
                    <br/>
                    <br/>
                    <br/>
                </p>
                <img className='images' src={post.imageUrls[0]}></img>


            </div>


            <button onClick={e => history.push(`review/new/${post._id}`)}>Review</button>
            

            <button className='likesButton' onClick={e => post.likes.map(user => user.user).includes(userId.toString()) ? dispatch(removeLike(post._id)) : dispatch(addLike(post._id))}>

                {post.likes.map(user => user.user).includes(userId.toString()) ? <i class="fa-regular fa-thumbs-down"></i> : <i class="fa-regular fa-thumbs-up"></i> }
            </button>
            <br/>
            <p className='likesNum' >{post.likes.length}</p>
            <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>
                Toggle Sidebar
            </div>
    {/* // */}
            <a onClick={handleAddToCart} className='Add-to-cart'>
            <ShoppingCartOutlined className='Add-to-cart1'/>Add to Cart
            </a>
    {/* // */}


        </li>
    )
}


export default PostIndexItem;

