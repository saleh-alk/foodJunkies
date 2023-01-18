import jwtFetch from './jwt'

export const RECEIVE_POSTS = 'post/RECEIVE_POSTS';
export const REMOVE_POST = 'post/REMOVE_POST';
export const UPDATE_POST = 'post/UPDATE_POST';

const recievePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
});

export const fetchPosts = () => async (dispatch) => {
    
        const res = await jwtFetch('/api/post');
        console.log(res);
        const posts = await res.json();
        console.log(posts);
        dispatch(recievePosts(posts));
    
}

const initialState = {}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {...action.posts}
            break;
        case REMOVE_POST:
        case UPDATE_POST:
        default:
            return state
            break;
    }
}

export default postReducer;