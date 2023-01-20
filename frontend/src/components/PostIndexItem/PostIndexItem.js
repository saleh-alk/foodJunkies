import './PostIndexItem.css';





import {ShoppingCartOutlined} from "@ant-design/icons"
import _ from "lodash"

import {Badge} from "antd"


    



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


    // console.log(cart)

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

        let p = post.price
    return (
        <li className='post-container'>
            <div className='post-main-content'>

                <span className='post-info-span'>
                    <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link> 
                    - {convertDate(post.createdAt)}</span>
                {/* image goes here */}
                {/*  */}
                {/*  */}
                <p>Reciepe Name: {post.reciepeName}</p>
                <p className='post-body-text'>{post.body}</p>
                


                
            </div>

            <button onClick={e => post.likes.map(user => user.user).includes(userId.toString()) ? dispatch(removeLike(post._id)) : dispatch(addLike(post._id))}>
                {post.likes.map(user => user.user).includes(userId.toString()) ? <i class="fa-regular fa-thumbs-down"></i> : <i class="fa-regular fa-thumbs-up"></i> }
                </button>
            <p>{post.likes.length}</p>
           
            {updateSidebarContent && <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>Toggle Sidebar</div>}
   
            

          

            <div className='price-Addtocart'>
                <p>price: {p === "undefined" ? "N/A" : `$${post.price}`}</p>

                {post.price === "undefined" ? "": <a onClick={handleAddToCart} className='Add-to-cart'>
                <ShoppingCartOutlined className='Add-to-cart1'/>Add to Cart</a>}
            </div> 

        </li>
    )
}


export default PostIndexItem;

