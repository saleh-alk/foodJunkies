import './PostIndexItem.css';
//
import {ShoppingCartOutlined} from "@ant-design/icons"
import _ from "lodash"
import { useSelector, useDispatch } from 'react-redux';
import {Badge} from "antd"
//
import { Link } from 'react-router-dom';



const PostIndexItem = ({ post, updateSidebarContent }) => {
    
    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }
//
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
            <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>
                Toggle Sidebar
            </div>

            <div className='price-Addtocart'>
                <p>price: {p === "undefined" ? "N/A" : `${post.price}`}</p>

                {post.price === "undefined" ? "": <a onClick={handleAddToCart} className='Add-to-cart'>
                <ShoppingCartOutlined className='Add-to-cart1'/>Add to Cart</a>}
            </div>
            
   
            
        </li>
    )
}

export default PostIndexItem;