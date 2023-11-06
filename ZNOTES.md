SCHEMA
    USER {
        username: STRING,
        password: STRING,
        displayName: STRING,
        email: STRING
        membership: enum["user", "admin"],
    }

    POST {
        title: STRING,
        body: STRING,
        author: STRING,
        date: DATE OBJ,
        comments: [
            date: DATE OBJ,
            author: STRING,
            body: STRING
        ],
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

