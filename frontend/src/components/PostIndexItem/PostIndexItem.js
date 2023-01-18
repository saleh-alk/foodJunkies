import './PostIndexItem.css';

const PostIndexItem = ({ post, updateSidebarContent }) => {
    const { username, profileImageUrl } = author; 
    const updateFile = e => setImage(e.target.files[0]);
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const handleSubmit = () => {
        dispatch(composeTweet(text, images));
        setImages([]);                        
        setImageUrls([]);                     
        setText('');
    }

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const updateFiles = async e => {
        const files = e.target.files;
        setImages(files);
        if (files.length !== 0) {
          let filesLoaded = 0;
          const urls = [];
          Array.from(files).forEach((file, index) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              urls[index] = fileReader.result;
              if (++filesLoaded === files.length) 
                setImageUrls(urls);
            }
          });
        }
        else setImageUrls([]);
      }

    return (
        <li className='post-container'>
            <div className='post-main-content'>
                <span className='post-info-span'>{post.author} - {convertDate(post.createdAt)}</span>
                {/* img goes here */}
                <div className="tweet-preview">
                    <h3>Tweet Preview</h3>
                    {(text || imageUrls.length !== 0) ?
                    <TweetBox tweet={{text, author, imageUrls}} /> :
                    undefined}
                </div>
                <label>
                Images to Upload
                <input type="file" accept=".jpg, .jpeg, .png" multiple
                    onChange={updateFiles} />
                </label>
                {profileImageUrl ?
                    <img className="profile-image" src={profileImageUrl} alt="profile"/> :
                    undefined
                }
                <p className='post-body-text'>{post.body}</p>
            </div>
            <div className='sidebar-toggle' onClick={()=>updateSidebarContent(post.body)}>
                Toggle Sidebar
            </div>
        </li>
    )
}

export default PostIndexItem;