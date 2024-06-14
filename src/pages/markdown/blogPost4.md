--- 
id: 4
author: Nelson E. Rodriguez
date: MAY 04, 2024
title: My Experience Developing A Personal Blog In MERN
imgURL: /images/nexus.png
category: Lifestyle
excerpt: MERN is one of the most popular tech-stacks in modern web development, and in this blog post I want to briefly discuss a little bit about my experience...
---

**<span style="font-family: system-ui"><span style="color:green">M</span><span style="color: orange">E</span><span style="color: turquoise">R</span><span style="color: lightgreen">N</span>** is one of the most popular tech-stacks in modern web development, and in this blog post I want to briefly discuss a little bit about my experience developing this blog using this particular tech-stack and why I did it.

**<span style="font-family: system-ui"><span style="color:green">M</span><span style="color: orange">E</span><span style="color: turquoise">R</span><span style="color: lightgreen">N</span>** is an acronym for the following: 

- MongoDB - a non-relational (no-SQL) document database
- Express(.js) - a Node.js web-app framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - a JavaScript web server

This architecture allows developers to construct a three-tier application architecture (front-end, back-end, and database) entirely written in JavaScript HTML/CSS, and JSON. 

In the past couple of years, numerous no-code solutions for building blogs have become commonplace in the digital space, which begs the question: 

**Why not just save myself the trouble and use an existing solution like WordPress?**

Although there are many existing solutions for creating and maintaining a blog, I believe there was value in deepening my understanding of the core software architecture that makes up many of the full-scale applications we see on the web today. I came to realize that not every project idea I had had to be a solution to an existing problem and could just be done for the sake of learning and enjoyment. 

That being said, I really developed this blog for 3 main purposes:


1. To learn **<span style="font-family: system-ui"><span style="color:green">M</span><span style="color: orange">E</span><span style="color: turquoise">R</span><span style="color: lightgreen">N** in an applied environment
2. To have full control over my data-pipeline and how I want to display my content on the web-page
3. To write blogs like this

In the following couple of lines, I want to briefly describe my development process creating the front-end and back-end of my application, and some things I learned in the process.

## <span style="font-family: system-ui; color: rgb(50, 0, 200)"> The Front-End </span>

Before building this blog, my experience with React was in creating very basic static web-pages, which didn't fully utilize React's potential. For simple static web pages, HTML and CSS are usually sufficient to get a personal blog up and running. However, I wanted more functionality, such as data storage, dynamic animations, and code reusability.

What makes React so special is its ability to break down a web page into components. For example, if you have a header and footer used in various parts of your web app, you can partition them into separate functions and call these components whenever needed. This modularity and reusability makes building a blog much easier since I was going to be reusing multiple lines of code throughout the project.

Beyond creating visual components and routing pages with JavaScript (which is what we see on the screen), I learned a lot about React hooks, particularly how to manage application state with useState and dynamically render elements with useEffect. A key feature in this blog was user authentication, and determining this in React is done via state variables: 

```const [loggedIn, setLoggedIn] = useState(false);```

A user's loggedIn state is initially set to false. Of course, when a user registers and subsequently logs in, the application has to mangage update their state appropriately, which is done by interfacing with the server component and verifying a valid session. Only when the server detects a valid session, does it send a message to the client (the JavaScript) to update the state. 

```setLoggedIn(true);```

React's useEffect hook also allowed me to specify how elements should render on the page and change dynamically based on input or data changes. For instance, I used a useEffect hook in my Header component to send an axios GET request to my server, verify the user's session status, and display it dynamically in the header. The dependency array, which is the empty array passed as a parameter to the useEffect hook, indicates that the effect does not depend on any data changes.

```
useEffect(() => {
  axios.get('http://localhost:3000/isLoggedIn', { withCredentials: true })
    .then(response => {
      if (response.data.isLoggedIn) {
        console.log(response.data.username + ' is already logged in');
        setErrorMessage('Seems like you're already logged in!');
        return;
    }
  })
}, []);
```

This approach ensured that the header component accurately reflected the user's login status based on the server's response, showcasing React's dynamic front-end rendering capabilities.

## <span style="font-family: system-ui; color: rgb(200, 0, 50)"> The Back-End </span>

In addition to creating complex components and utilizing hooks in React, my application needed to be able to handle data storage functionality so I built a back-end server that interfaces with MongoDB's Atlas database service to support secure user authentication, blog creation/storage, comment functionality, and quick data fetching and post operations.

The server does 3 main things: 
1. Declares necessary server dependencies and libraries (like express, mongostore and cors)
2. Instantiates database schemas, stores, and models
3. Implements router endpoints to send and receive data from the database

My blog posts are written using Markdown and I had only planned on using local data storage to reference each post mostly by using a JSON array data structure. Eventually I decided to store each post as an object in Atlas to allow for user comment functionality. This was done by parsing the data from the JSON array containing each blog post and saving them to Atlas.

The code snippet below demonstrates how I iterated through each blog post and saved new posts to the database while checking for existing posts to avoid duplicates:



```
const filePath = path.join(__dirname, '..', 'pages', 'data', 'posts.json');
const data = fs.readFileSync(filePath, 'utf8');
const blogPosts = JSON.parse(data); // array of blog post objects

for (const post of blogPosts) {
   // check for existing post
   const existingPost = await BlogPost.findOne({ id: post.id })
   if (existingPost) {
      continue;
   }
   const newPost = new BlogPost(post);
   await newPost.save();
}
```

Of course, I wanted each object entry in MongoDB to retain all the information contained in it's metadata, but add an entry for comments associated with that specific blog post and user. To achieve this, I designed a BlogPostSchema using MongoDB's Mongoose library to define various fields that captured the essential attributes I needed in a blog post. Here's a detailed look at the schemas for users, user comments, and blog posts:

```
const UserSchema = new mongoose.Schema({
   username: String,
   email: String,
   password: String,
});

const CommentSchema = new mongoose.Schema({
   username: { type: String, required: true },
   text: { type: String, required: true },
   date: { type: Date, default: Date.now }
});

const BlogPostSchema = new mongoose.Schema({
   id: String,
   title: String,
   author: String,
   likes { type: Number, default: 0},
   comments: [CommentSchema],
});
```

When a user creates a new comment, it is appended to the comments array of the corresponding BlogPost document. The use of sub-document arrays in MongoDB provides a performant way to manage one-to-many relationships. MongoDB's implicit schema-less nature (by not enforcing a rigid schema) allows for flexibility, but defining schemas using Mongoose adds a layer of structure and consitency, making the application more reliable and maintainable in case I needed to make any changes in the future.

### <span style="font-family: system-ui; color: rgb(200, 0, 50)">Data Integrity + Scalability
By defining schemas, I ensured that every document stored in the database adheres to a specific structure, which helps maintain data integrity and consistency. 

Furthermore, storing comments as sub-documents within each blog post document allows for efficient data retrieval and manipulation. MongoDB's document-oriented nature, combined with Mongoose's schema definitions, provided a performant and scalable solution for managing one-to-many relationships (like blog-post to comments)

As it relates to user authentication, passwords salted and hashed using the bcrypt encryption algorithm and stored as a field in the object. This ensures that user credentials are securely stored and protected against common attack vectors and security threats such as brute-force and dictionary attacks. Below is an example of the registration endpoint that handles the creation of a new user in the application:  

```
// POST endpoint for creating a new user
app.post('/register', async(request, response) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const newUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    });

    const existingUsername = await User.findOne({ username: newUser.username }); 
    const existingEmail = await User.findOne({ email: newUser.email });

    if (existingUsername || existingEmail) {
        return response.status(400).json( {error: "Username or email already taken"} );
    }
    await newUser.save();
    response.status(201).json('User created successfully');

  } catch (error) {
    response.status(400).json('User registration error: ' + error);
  }
});
```

The post method first generates a salt, which is a unique set of characters added to the password string to enhance security. This salt is combined with the password and then processed by bcrypt, which applies an encryption algorithm to safely hash the password. Hashing transforms the password into a fixed-length string of characters, which is virtually impossible to reverse-engineer. This hashed password, along with the salt, is then securely stored in MongoDB Atlas after the User has been validated.

## <span style="font-family: system-ui; color: rgb(50, 200, 0)"> Final Thoughts

This project has been an immensely rewarding learning experience. It not only sharpened my skills in developing sophisticated front-end components using React hooks and dynamic data processing but also equipped me with the expertise to architect, build, and maintain a robust back-end server component using Node.Express, and MongoDB. The ability to exercise complete control over the server's functionality was particularly enlightening.

Working with **<span style="font-family: system-ui"><span style="color:green">M</span><span style="color: orange">E</span><span style="color: turquoise">R</span><span style="color: lightgreen">N</span>** in this capacity significantly enhanced my understanding of full-stack development, providing a strong foundation for me to continue tackling future projects in this domain.

For a more comprehensive look at my project's implementation, please feel free to explore the entire codebase on my GitHub repo [here](https://github.com/Yugenero/Nexus)

Thanks for reading!