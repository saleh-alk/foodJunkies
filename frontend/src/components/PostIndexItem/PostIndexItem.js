import './PostIndexItem.css';

//
import {ShoppingCartOutlined} from "@ant-design/icons"
import _ from "lodash"

import {Badge} from "antd"
//








import { Link, useHistory } from 'react-router-dom';
import { addLike, removeLike } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';



const PostIndexItem = ({ post, updateSidebarContent }) => {


    const userId = useSelector(state => state.session.user._id)




    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const {cart} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

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


    return (
        <li className='post-container'>
            <div className='post-main-content'>

                <span className='post-info-span'>
                    <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link> - {convertDate(post.createdAt)}</span>
                <p className='post-body-text'>{post.body}
                    <br/>
                    <img className='images' src={post.imageUrls[0]}></img>
                </p>


            </div>
            <button onClick={e => post.likes.map(user => user.user).includes(userId.toString()) ? dispatch(removeLike(post._id)) : dispatch(addLike(post._id))}>
                {post.likes.map(user => user.user).includes(userId.toString()) ? <i class="fa-regular fa-thumbs-down"></i> : <i class="fa-regular fa-thumbs-up"></i> }
                </button>
            <p>{post.likes.length}</p>

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
