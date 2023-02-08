import jwtFetch from './jwt'

export const RECEIVE_POSTS = 'post/RECEIVE_POSTS';
export const REMOVE_POST = 'post/REMOVE_POST';
export const UPDATE_POST = 'post/UPDATE_POST';
const RECEIVE_NEW_POST = "post/RECEIVE_NEW_POST"
const RECEIVE_POST_ERRORS = "post/RECEIVE_POST_ERRORS"
const UPDATE_LIKES = "post/UPDATE_LIKES"
const CLEAR_POST_ERRORS = 'post/CLEAR_POST_ERRORS'

const recievePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});


const removePost = (postId, key) => ({
    type: REMOVE_POST,
    postId,
    key
});



const receiveErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
});

export const clearPostErrors = () => ({
    type: CLEAR_POST_ERRORS
})

const receiveNewPost = post => ({
    type: RECEIVE_NEW_POST,
    post
});




export const getPost = (postId) => (store) => {
    if(store.post && store.post[postId]) return store.post[postId];
    return null;
}

export const deletePost = (postId, key) => async (dispatch) => {
    const response = await jwtFetch(`/api/post/${postId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        dispatch(removePost(postId, key));
    }
}

export const updatePost = (body, images, postId) => async (dispatch) => {
    const formData = new FormData();
    formData.append("body", body);
    
    Array.from(images).forEach(image => formData.append("images", image));

   
    const res = await jwtFetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: formData
    });
 
        if(res.ok){
           
        } else{
            
        }
    
        
        const post = await res.json();
     
        dispatch(receiveNewPost(post));
        
    // } catch(err){
    //     const resBody = await err.json();
    //     if (resBody.statusCode === 400) {
    //         return dispatch(receiveErrors(resBody.errors));
    //     }
    // }
    
    // const response = await jwtFetch(`/api/post/${postId}`, {
    //     method: "PATCH",
    //     body: formData,
    // });
    
    // if (response.ok){
    //     let data = await response.json();
    //     // console.log(response)
    //     dispatch(receiveNewPost(data));
    // }
    
}



// export const fetchPosts = () => async (dispatch) => {


export const fetchPosts = ({query}) => async (dispatch) => {

    query ||= ''
    try {
        const res = await jwtFetch(`/api/post` + query);
        const posts = await res.json();
        dispatch(recievePosts(posts));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            // dispatch(receiveErrors(resBody.errors)); todo
        }
    }
}

export const searchPosts = () => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/post/search`);
        const results = await res.json();
       
    } catch (err) {
        //console.log(err)
    }
}

export const composePost = (body, images, reciepeName, price, query) => async dispatch => {

    const formData = new FormData();
    formData.append("body", body);
    formData.append("reciepeName", reciepeName);
    formData.append("price", price);
    Array.from(images).forEach(image => formData.append("images", image))
   

   try{
       const res = await jwtFetch('/api/post/', {
           method: 'POST',
           body: formData
       });
       const post = await res.json();
       
       
        dispatch(fetchPosts({query}));
       dispatch(clearPostErrors())
    //    window.location.href = '/posts';
    //    dispatch(receiveNewPost(post));
   } catch(err){
       const res = await err.json()

       if (res.statusCode === 400) {
           return dispatch(receiveErrors(res.errors))
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
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...action.posts};
        case REMOVE_POST:
            delete newState[action.key];
            return newState;
        case UPDATE_POST:
        case RECEIVE_NEW_POST:
            return {...newState, [newState.length+1]: {...action.post}}
        case UPDATE_LIKES:
            return {
                ...state,
                //  posts: state.posts.map((post) => post._id === action.payload.id ? {...post, likes: action.payload.likes} :post)
                 }
        default:
            return state
                
    }
}

export default postReducer;


const nullErrors = null;

export const postErrorReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors
            break;
        case CLEAR_POST_ERRORS:
            return nullErrors
            break;
        default:
            return state;
            break;
    }
}