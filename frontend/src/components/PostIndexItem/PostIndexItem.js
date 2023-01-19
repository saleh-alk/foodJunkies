import './PostIndexItem.css';

import { Link } from 'react-router-dom';


const PostIndexItem = ({ post, updateSidebarContent }) => {


    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    return (
        <li className='post-container'>
            <div className='post-main-content'>

                <span className='post-info-span'>
                    <Link to={`/profile/${post.author._id}`} id="profileLink">{post.author.username}</Link> - {convertDate(post.createdAt)}</span>
                <p className='post-body-text'>{post.body}</p>
                <br/>
                <img className='images' src={post.imageUrls[0]}></img>
            </div>
            <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>
                Toggle Sidebar
            </div>
        </li>
    )
}

export default PostIndexItem;
