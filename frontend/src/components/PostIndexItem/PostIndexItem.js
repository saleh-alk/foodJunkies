import Collapsible from '../Collapsible/Collapsible';
import './PostIndexItem.css';

const PostIndexItem = ({ post }) => {


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
            <Collapsible/>
        </li>
    )
}

export default PostIndexItem;