import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { composePost } from '../../store/post';

function CreatePost() {


    const [body, setBody] = useState("")
    const author = useSelector(state => state.session.user)
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const dispatch = useDispatch()

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


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composePost(body, images)); //
        setImages([]);                        
        setImageUrls([]);                    
        setBody('');
    };

   
    

  return (
    <div>
    
        <form onSubmit={handleSubmit}>
            <input
            value= {body}
            placeholder="Body"
            onChange={(e) => setBody(e.target.value)} />

              <label>
                  Images to Upload
                  <input
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      multiple
                      onChange={updateFiles}
                      />
              </label>

              <input type='submit'
                    value="Post"
                    disabled={!body}
                />
        
        </form>


    
    </div>
  )
}

export default CreatePost