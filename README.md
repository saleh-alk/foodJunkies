# [foodJunkies](https://foodjunkies.onrender.com/)

## About

foodJunkies is an application where users can post their homemade dishes and interact with other user's posts. There is an option for Users to purchase dishes they like as well. 

## Technologies
foodJunkies was built using MongoDB as the database management system, Express.js web application framework for Node.js, and React.js for the frontend. A few of the icons used are from [Font Awesome](https://fontawesome.com). The Logo is from [Logo.com](https://logo.com/).

## Features
Users will need to log in to access the full functionality of the page. Once logged in, users can view other posts that people have made. Not only can they view the posts, they can interact by liking, reviewing, or adding the item to the cart. Once a user has items in their cart, they can check out and purchase the items. A user can also make their own food post. 

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/61297172/219813902-a0e71f66-ef8b-40a1-a2a2-f3aa3678098c.gif)


### Post CRUD

![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/61297172/219814527-02289d99-bdc3-4643-ad07-3354f5a4da83.gif)

### Adding to Cart

![ezgif com-video-to-gif (2)](https://user-images.githubusercontent.com/61297172/219814833-06997c86-bc3b-4c40-94b4-30c56970ef4d.gif)


## Code Snippets
### Search Bar
```javascript
    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            history.push(`/posts?search=${e.target.value}`);
        }
    }

```
### AWS function

```javascript
const singleFileUpload = async ({ file, public = false }) => {
    const { originalname, buffer } = file;
    const path = require("path");

    // Set the name of the file in your S3 bucket to the date in ms plus the
    // extension name.
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
      Bucket: NAME_OF_BUCKET,
      Key: public ? `public/${Key}` : Key,
      Body: buffer
    };
    const result = await s3.upload(uploadParams).promise();

    // Return the link if public. If private, return the name of the file in your
    // S3 bucket as the key in your database for subsequent retrieval.
    return public ? result.Location : result.Key;
  };

```

