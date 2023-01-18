import jwtFetch from './jwt'

export const RECEIVE_POSTS = 'post/RECEIVE_POSTS';
export const REMOVE_POST = 'post/REMOVE_POST';
export const UPDATE_POST = 'post/UPDATE_POST';

export const composeTweet = (text, images) => async dispatch => {
    const formData = new FormData();
    formData.append("text", text);
    Array.from(images).forEach(image => formData.append("images", image));
    try {
      const res = await jwtFetch('/api/tweets/', {
        method: 'POST',
        body: formData
      });
    }

const recievePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
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

const initialState = {}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {...action.posts};
        case REMOVE_POST:
        case UPDATE_POST:
        default:
            return state
    }
}

export default postReducer;