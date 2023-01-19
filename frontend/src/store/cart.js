let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};



// import jwtFetch from './jwt'

// const ADD_ITEMS = 'cartItem/ADD_ITEMS';
// const ADD_ITEM = 'cartItem/ADD_ITEM';
// const REMOVE_ITEM = 'cartItem/REMOVE_ITEM';

// export const addItems = items => ({
//     type: ADD_ITEMS,
//     items
//   });
  
//   export const addItem = item => ({
//     type: ADD_ITEM,
//     item
//   });
  
//   export const removeItem = itemId => ({
//     type: REMOVE_ITEM,
//     itemId
//   })

//   export const loadCartItems = state => {
//     return state.cartItems ? Object.values(state.cartItems) : [];
//   }

//   export const createCartItem = cartData => async dispatch => {
//     const res = await jwtFetch(`/api/users/cart`, {
//       method: 'POST',
//       body: JSON.stringify(cartData)
//     });
  
//     if (res.ok) {
//       const newCartItem = await res.json();
//       dispatch(addItem(newCartItem));
//       return newCartItem;
//     }
//   }


// //   export const removeCartItem = () => async dispatch => {
// //     const res = await jwtFetch(`/api/users/empty-cart`, {
// //       method: 'DELETE',
// //     });
  
// //     if (res.ok) {
// //       dispatch(removeItem(cartItemId));
// //     }
  
// //     return res;
// //   }


//   const cartItemReducer = (state = {}, action) => {
//     Object.freeze(state);
  
//     switch(action.type) {
//       case ADD_ITEMS:
//         return action.items
//       case ADD_ITEM:
//         // const {id} = action.item;
//         return {...state, [action.item.id]: action.item};
//     //   case REMOVE_ITEM:
//     //     const nextState = {...state}
//     //     delete nextState[action.itemId];
//     //     return nextState;
//       default:
//         return state;
//     }
//   }
  
//   export default cartItemReducer;