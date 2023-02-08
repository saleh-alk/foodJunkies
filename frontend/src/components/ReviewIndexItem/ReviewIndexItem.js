import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { deleteReview, fetchUsersReview } from '../../store/review';





function ReviewIndexItem({review, key}) {
    
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    //const userId = useSelector(state => state.session.user._id)
    const history = useHistory()
    const reviewer = useSelector(state => Object.values(state.review))
    const { userId } = useParams()
    const location = useLocation()

  

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

   
 


    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteReview(review.id, userId, userId))

    }

    const handleClick = (e) => {
        e.preventDefault()
        history.push(`/review/update/${review.id}/${userId}`)
    }

    // useEffect(()=> {
    //     dispatch(fetchUsersReview(userId))
    // }, [dispatch])

    


  return (

      <div className='post-container'>
          <div className='post-main-content'>

            
              <span className='post-info-span'>
                  {convertDate(review.postedAt)}</span>
              <br />

              
              <h1 className='review-title'>{review.title}</h1>
              <div className='review-body'>Comment:{review.body}</div>
              <div className='review-rating'>Rating: {review.rating}</div>

              {review.reviewer == currentUser._id ?  <button  className='reviewButton' onClick={handleDelete}>Delete</button> : <div></div> }

              {review.reviewer == currentUser._id ? <button onClick={handleClick} className="reviewButton" >edit</button> : <></>}
              {/* <button onClick={handleDelete}>Delete</button> */}
            

          </div>

          
          <br />
          
        


      </div>
  )
}

export default ReviewIndexItem