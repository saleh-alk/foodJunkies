import Collapsible from '../Collapsible/Collapsible';
import './PostIndexItem.css';

const PostIndexItem = ({ post, toggleSidebar }) => {


    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    return (
        <li className='post-container'>
            <div className='post-main-content'>
                <span className='post-info-span'>{post.author} - Posted {convertDate(post.createdAt)}</span>
                {/* img goes here */}
                <p className='post-body-text'>{post.body}</p>
            </div>
            <div className='sidebar-toggle' onClick={()=>toggleSidebar(post.body)}>
                Toggle Sidebar
            </div>
        </li>
    )
}

export default PostIndexItem;