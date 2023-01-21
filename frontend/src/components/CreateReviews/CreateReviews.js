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

    const {postId} = useParams()


    const handleClick = (e) => {
        e.preventDefault()

        dispatch(composeReview(title, body, rating, postId))
        setBody("")
        setRating("")
        setTitle("")

        history.push('/posts')

    }


  return (
    <>

        <div>Create Review</div>
        <form  className = "review-form" onSubmit={handleClick}>


            <input
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            placeholder= "title"
             />

            <input
                value={body}
                onChange={(e)=> setBody(e.target.value)}
                placeholder="body"
            />

            <input
                value={rating}
                onChange={(e)=> setRating(e.target.value)}
                placeholder="rating"
            />

              <input type='submit'
                  value="Review"
                  disabled={!body || !title || !rating}
              />

        </form>
    </>
  )
}

export default CreateReviews