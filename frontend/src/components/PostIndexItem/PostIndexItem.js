import './PostIndexItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteReview } from '../../store/post';


const PostIndexItem = ({ post, updateSidebarContent }) => {
const currentUser = useSelector(state => state.session.user);
const dispatch = useDispatch();

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const handleClick = (post) => {
        dispatch(deleteReview(post._id))
    }

    const editDeleteButton = (post) => {
        if (currentUser._id === post.author._id){
            return(
                <>
                    <button>Edit</button>
                    <button onClick={()=> handleClick(post)}>Delete</button>
                </>
            )
        }
    }


    return (
        <li className='post-container'>
            <div className='post-main-content'>

                <span className='post-info-span'>
                    <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link> 
                    - {convertDate(post.createdAt)}</span>

                {editDeleteButton(post)}
                
                {/* img goes here */}
                <p className='post-body-text'>{post.body}</p>


            </div>
            <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>
                Toggle Sidebar
            </div>
        </li>
    )
}

export default PostIndexItem;