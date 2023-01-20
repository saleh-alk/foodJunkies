import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Cartitem.css";

const Cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()
  const handleQuantityChange = e => {
    let cart = []
    if (typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((post, i) => {
            cart[i].quantity = e.target.value
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
            type: "ADD_TO_CART",
            payload: cart,
        })
    }
  }
    
  const showCartitems = () => (
    <>
      {cart.map((c, i) => (
        <div key={i} className="cart">
          <img className="images" src={c.post.imageUrls[0]}></img>
          <h1>{c.post.reciepeName.toUpperCase()}</h1>
          <p>
            {c.post.price} x {c.quantity} = {c.post.price * c.quantity}
          </p>
          <input type="number" value={c.quantity} onChange={handleQuantityChange}/>
          <button disabled={!cart.length} className="button">
            Proceed to Checkout
          </button>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div>
        <h1>Cart</h1>
      </div>

      <div>
        {!cart.length ? (
          <h1>
            Your Cart is Empty.{" "}
            <Link to="/posts">Add items to get started</Link>
          </h1>
        ) : (
          showCartitems()
        )}
      </div>
      {/* {cart.map((c, i) => (
                <div key={i}>
                    <p>{c.post.body} x {c.quantity} = $total</p>
                </div>
            ))} */}
    </>
  );
};

export default Cart;
