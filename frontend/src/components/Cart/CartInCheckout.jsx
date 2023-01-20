import React from "react";
import "./Cartitem.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {CloseOutlined} from "@ant-design/icons"

const CartInCheckout = ({ p }) => {
  const { cart } = useSelector((state) => ({ ...state }));
//   console.log(p.post.price);
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let quantity = e.target.value < 1 ? 1 : e.target.value;
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((post, i) => { 
        
        if ((post.post._id.toString()) == (p.post._id).toString()) {
            cart[i].quantity = quantity
            
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p.post._id)
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((post, i) => { 
    
        if ((post.post._id.toString()) == (p.post._id).toString()) {
            cart.splice(i, 1)
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };


  return (
    <>
      <img className="images" src={p.post.imageUrls[0]}></img>
      <h1>{p.post.reciepeName.toUpperCase()}</h1>
      <p>Price: ${p.post.price}</p>
      {/* <p>
        {p.post.price} x {p.quantity} = {p.post.price * p.quantity}
        </p> */}
        <p>Quantity:<input
          type="number"
          value={p.quantity}
          onChange={handleQuantityChange}
        /></p>
        
     
      <p><CloseOutlined onClick={handleRemove}/></p>
    </>
  );
};

export default CartInCheckout;
