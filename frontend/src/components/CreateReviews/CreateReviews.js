import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { composeReview } from '../../store/review'
import './CreateReview.css'

function CreateReviews() {


    const history = useHistory()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [rating, setRating] = useState('')

    const {postId, userId} = useParams()


    const handleClick = (e) => {
        e.preventDefault()

        dispatch(composeReview(title, body, rating, postId, userId))
        setBody("")
        setRating("")
        setTitle("")

        history.push('/posts')

    }


  return (
    <>

        <div>Create Review</div>

        
        <form  className = "review-form" onSubmit={handleClick}>

            <div className='review-inputs'>


                <div className='inner-div'>
                
                <input
                className='review-style-inputs'
                type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                placeholder= "title"
                />
                      <label> Title </label>
                  </div>
        


                
                <textarea
                    className='review-style-inputs'
                    type="text"
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                    placeholder="body"
                />
                  <label> Body </label>
            


                
                <input
                    type="text"
                    className='review-style-inputs'
                    value={rating}
                    onChange={(e)=> setRating(e.target.value)}
                    placeholder="rating"
                />
                  <label> Rating </label>
            

              <input type='submit'
                    className='review-style-inputs'
                  value="Review"
                  disabled={!body || !title || !rating}
              />

              </div>

        </form>
    </>
  )
}

export default CreateReviews