import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ReviewIndexItem({review}) {
    
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user._id)
    const history = useHistory()

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }


  return (

      <li className='post-container'>
          <div className='post-main-content'>


              <span className='post-info-span'>
                  {convertDate(review.postedAt)}</span>
              <br />
              <p className='post-body-text'>{review.title}
                  <br />
                  <br />
                  <br />
              </p>
            

          </div>

          
          <br />
          
        


      </li>
  )
}

export default ReviewIndexItem