const ProfilePostIndex = ({post}) => {

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    return(
        <>
            <li className='post-container'>
                <div className='post-main-content'>
                    <span className='post-info-span'>{post.author.username} - {convertDate(post.createdAt)}</span>
                    {/* picture here */}
                    <p className='post-body-text'>{post.body}</p>
                </div>
            </li>
        </>
    )
}

export default ProfilePostIndex;