TODO
Set timeout for OpenAI API call fail
Add limit on post title length
style login modal for post when user not logged in

SCHEMA
    USER {
        username: STRING,
        password: STRING,
        displayName: STRING,
        email: STRING
        membership: enum["user", "admin"],
        likedPosts: [
            {
                postID: _id,
                liked: BOOLEAN    
            }
        ]
    }

    POST {
        title: STRING,
        body: STRING,
        author: STRING,
        date: DATE OBJ,
        votes: NUMBER,
        comments: [
            date: DATE OBJ,
            author: STRING,
            body: STRING
        ],
        likes: NUMBER,
        tags: STRING
    }

URI
    /
    /users
    /user/:id
    /user/:id/posts
    /user/:id/post/:id
    /user/:id/post/add
    /user/:id/post/:id/delete

    /posts
    /post/:id 

