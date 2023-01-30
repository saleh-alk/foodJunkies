import jwtFetch from './jwt'

const RECEIVE_NEW_REVIEW = "review/RECEIVE_NEW_REVIEW"

const RECEIVE_USERS_REVIEW = "RECEIVE_USERS_REVIEW"



export const getUserReviews = (reviews) => ({
    type: RECEIVE_USERS_REVIEW,
    reviews

})




const receiveNewReview = (reviews) => ({
    type: RECEIVE_NEW_REVIEW,
    reviews
});




export const composeReview = (title, body, rating, postId, userId) => async dispatch => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append('rating', rating);


    try {
        const res = await jwtFetch(`/api/reviews/${postId}/${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                rating: rating,
                
            })
        });
        const reviews = await res.json();
        dispatch(receiveNewReview(reviews));
    } catch (err) {
        
    }
}


export const fetchUsersReview = (userId) => async (dispatch) =>  {

    const res = await jwtFetch(`/api/reviews/user/${userId}`)


    if(res.ok){
        const reviews = await res.json()
        return dispatch(receiveNewReview(reviews))
    }

}


export const fetchPostReviews = (postId) => async (dispatch) =>{
    const res = await jwtFetch(`api/reviews/post/${postId}`)

    if(res.ok){
        const reviews = await res.json()
        return dispatch(receiveNewReview(reviews))
    }
}





const initialState = {}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_NEW_REVIEW:
            return {...state, ...action.reviews };
        case RECEIVE_USERS_REVIEW:
            return {...state, ...action.reviews}
        default:
            return state;
       
    }
}

export default reviewReducer;