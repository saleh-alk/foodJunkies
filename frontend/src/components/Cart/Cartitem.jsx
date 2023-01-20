import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./Cartitem.css";
import CartInCheckout from "./CartInCheckout";
import { useHistory } from "react-router-dom";


const Cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));


const history = useHistory();
  const emptyCart = () => {
    history.push("/checkout");

//import './cart.css';


const Cart = () => {
    const {cart} = useSelector((state)=> ({...state}))
    return (
            <div id ="outer">
        <div>
            <h1>Cart</h1>
        </div>

        <div>
           {!cart.length ? (<h1>Your Cart is Empty. <Link to="/posts">Add items to get started</Link></h1>) : ("show cart items")} 
        </div>
            {cart.map((c, i) => (
                <div key={i}>
                    <p>{c.post.body} x {c.quantity} = $total</p>
                </div>
            ))}

            <button disabled={!cart.length}>Proceed to Checkout</button>
        </div>
    )

}

  const showCartitems = () => (
    <>
      {cart.map((p) => (
        <CartInCheckout key={p._id} p={p} />
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
        <button disabled={!cart.length} className="button" onClick={emptyCart}>
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default Cart;
