import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";


const Checkout = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
const emptyCart = () => {
    history.push("/posts");
    if (typeof window !== "undefined"){
        localStorage.removeItem("cart")
    }
    dispatch({
        type: "ADD_TO_CART",
        payload: [],
    })
}

    return (
        <div className="checkout_modal">
            <i className="fa-solid fa-xmark" onClick={emptyCart}></i>
            <div className="checkout_modal_contents">
                <br /><br />
                <h1>Thank you!</h1>
                <p className="checkout">
                    {"for checking out our website!".toUpperCase()}
                </p>
                    <br /><br />
                    <button className="go_main" onClick={emptyCart}>
                        HOME PAGE
                    </button>
            </div>
        </div>
    );
}

export default Checkout;