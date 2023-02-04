import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchReview, updateReview } from '../../store/review'

import './ReviewUpdate.css'





function ReviewUpdate() {

    const { reviewId, userId } = useParams()
    const review = useSelector(state => state.review)

    const [title, setTitle] = useState(review.title)
    const [body, setBody] = useState(review.body)
    const [rating, setRating] = useState(review.rating)
    const dispatch = useDispatch()
    

    console.log(review.title)


  const handleClick = (e) => {
    e.preventDefault()

    dispatch(updateReview(title, body, rating, reviewId))
  

    //history.push('/posts')

  }


    useEffect( () => {
      dispatch(fetchReview(reviewId))
    }, [])

  return (
    
      <div className='review-update'>
      <form className="review-form" onSubmit={handleClick}>

        <div className='review-inputs'>


          <div className='inner-div'>
            {/* <div className="errors">{errors?.title}</div> */}
            <input
              className='review-style-inputs'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={title}
            />
            <label> Title </label>
          </div>

          {/* <div className="errors">{errors?.body}</div> */}
          <input
            className='review-style-inputs'
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={body}
            id='review-body'
          />
          <label> Body </label>


          {/* <div className="errors">{errors?.rating}</div> */}
          <input
            type="text"
            className='review-style-inputs'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder={rating}
            required
          />
          <label> Rating </label>


          <input type='submit'
            className='review-style-inputs'
            value="Review"
            disabled={!body || !title || !rating}
          />

        </div>

      </form>
        

      </div>
  
  )
}

export default ReviewUpdate