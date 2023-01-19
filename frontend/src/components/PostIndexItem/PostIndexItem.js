import './PostIndexItem.css';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PostIndexItem = ({ post, updateSidebarContent }) => {

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    return (
        <li className='post-container'>
            <div className='post-main-content'>

                <span className='post-info-span'>
                    <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link> 
                    - {convertDate(post.createdAt)}</span>
                {post.imageUrls[0] && <img src={post.imageUrls[0]}></img>}
                <p className='post-body-text'>{post.body}</p>


            </div>
            <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>
                Toggle Sidebar
            </div>
        </li>
    )
}

export default PostIndexItem;