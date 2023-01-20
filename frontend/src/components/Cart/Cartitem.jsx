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
  };

  const showCartitems = () => (
    <>
      {cart.map((p) => (
        <CartInCheckout key={p._id} p={p} />
      ))}
    </>
  );

  return (
    <>
      <div className="cart1">
        {/* <h1>Cart</h1> */}

        <div >
          {!cart.length ? (
        <div>

            <h1>
              Your Cart is Empty.
            </h1>
            <button className="cart2">
            <Link to="/posts" className="link">ADD ITEMS</Link>
            </button>
        </div>
        
          ) : (
           
            showCartitems()
          )}
          <button
            disabled={!cart.length}
            className="button"
            onClick={emptyCart}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
