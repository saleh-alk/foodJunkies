import './PostIndexItem.css';

const PostIndexItem = ({ post, updateSidebarContent }) => {


    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    return (
        <li className='post-container'>
            <div className='post-main-content'>
                <span className='post-info-span'>{post.author} - {convertDate(post.createdAt)}</span>
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