import './PostIndexItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost} from '../../store/post';
import { NavLink } from "react-router-dom";


const PostIndexItem = ({ post, key, updateSidebarContent }) => {
const currentUser = useSelector(state => state.session.user);
const dispatch = useDispatch();

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const handleClick = (post) => {
        
        dispatch(deletePost(post._id, key))
    }

    const editDeleteButton = (post) => {
        if (currentUser._id === post.author._id){
            return(
                <>
                    <NavLink to ={{pathname: `/${post._id}/edit`}}><button className="EditDeleteButton">Edit</button></NavLink>
                    <button onClick={()=> handleClick(post)} className="EditDeleteButton">Delete</button>
                </>
            )
        }
    }

   

    return (
        <li className='post-container'>
            <div className='post-main-content'>

                <span className='post-info-span'>
                    {console.log(post)}
                  
                    <Link to={`/profile/${post?.author._id}`} id="profileLink">{post.author.username}</Link> 
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