import jwtFetch from './jwt'

const RECEIVE_NEW_REVIEW = "review/RECEIVE_NEW_REVIEW"




const receiveNewReview = review => ({
    type: RECEIVE_NEW_REVIEW,
    review
});




export const composeReview = (title, body, rating, postId) => async dispatch => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append('rating', rating);


    try {
        const res = await jwtFetch(`/api/reviews/${postId}`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                rating: rating
            })
        });
        const review = await res.json();
        dispatch(receiveNewReview(review));
    } catch (err) {
        
    }
}



const initialState = {}
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_NEW_REVIEW:
            return {...action.posts };
        default:
            return state;
       
    }
}

export default reviewReducer;