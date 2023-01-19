import jwtFetch from './jwt'

export const RECEIVE_POSTS = 'post/RECEIVE_POSTS';
export const REMOVE_POST = 'post/REMOVE_POST';
export const UPDATE_POST = 'post/UPDATE_POST';
const RECEIVE_NEW_POST = "post/RECEIVE_NEW_POST"
const RECEIVE_POST_ERRORS = "post/RECEIVE_POST_ERRORS"
const UPDATE_LIKES = "post/UPDATE_LIKES"

const recievePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});


const receiveErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
});

const receiveNewPost = post => ({
    type: RECEIVE_NEW_POST,
    post
});


export const fetchPosts = () => async (dispatch) => {

    try {
        const res = await jwtFetch('/api/post');
        const posts = await res.json();
        dispatch(recievePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {

        

            // dispatch(receiveErrors(resBody.errors)); todo

        }
    }
}



export const composePost = (body, images) => async dispatch => {

    const formData = new FormData();
    formData.append("body", body);
    Array.from(images).forEach(image => formData.append("images", image))

   try{
       const res = await jwtFetch('/api/post/', {
           method: 'POST',
           body: formData
       });
       const post = await res.json();
       dispatch(receiveNewPost(post));
   } catch(err){
       const resBody = await err.json();
       if (resBody.statusCode === 400) {
           return dispatch(receiveErrors(resBody.errors));
       }
   }
}


export const fetchUserPosts = (userId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/post/user/${userId}`);
        const posts = await res.json();
        dispatch(recievePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            // dispatch(receiveErrors(resBody.errors)); todo
        }
    }

}



export const addLike = (id) => async dispatch => {
    try{
        const res = await jwtFetch(`/api/post/like/${id}`,{
            method: 'PUT'

        })
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }

}


export const removeLike = (id) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/post/unlike/${id}`, {
            method: 'PUT'

        })
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }

}


const initialState = {}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {...action.posts};
        case REMOVE_POST:
        case UPDATE_POST:
        case UPDATE_LIKES:
            return {
                ...state,
                 posts: state.posts.map((post) => post._id === action.payload.id ? {...post, likes: action.payload.likes} :post)
                 }
        default:
            return state
    }
}

export default postReducer;