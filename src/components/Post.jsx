import React from 'react';
import Comment from './Comment';

import {v4 as uuidv4} from 'uuid'; 

export default function Post(props) {

    const [post, setPost] = React.useState({});
    const [deletePost, setDeletePost] = React.useState(false);
    const [comment, setComment] = React.useState({
        author: "",
        body: "",
        date: ""
    });
    const [sendComment, setSendComment] = React.useState(false);

    React.useEffect(() => {
        const url = `http://localhost:3000/blog/user/${props.user.username}/post/${props.post._id}`;
        async function getPost() {
            try {
                await fetch(url)
                .then((res) => res.json())
                .then((data) => setPost(data));
            } catch(err) {
                console.log(err);
            }
        }
        getPost();
    }, []);

    React.useEffect(() => {
        const url = `http://localhost:3000/blog/user/${props.user.username}/post/${props.post._id}/delete`;
        async function handleDeletePost() {
            try {
                if (deletePost) {
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({postID: props.post._id})
                    })
                    .then(() => {props.setPage("home")});
                }
            } catch(err) {
                console.log(err);
            }
        }
        handleDeletePost();
    }, [deletePost])

    React.useEffect(() => {
        async function addComment() {
            if (sendComment) {
                try {
                    const url = `http://localhost:3000/blog/user/${props.user.username}/post/${props.post._id}/addComment`;
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            postID: props.post._id,
                            comment: comment
                        })
                    }).then(() => {setSendComment(false)})
                } catch(err) {
                    console.log(err);
                }
            }
        }
        addComment();
    }, [sendComment])

    function handleCommentInputChange(e) {
        setComment((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    function handleCommentSubmit() {
        setComment((prev) => ({
            ...prev,
            date: new Date()
        }))
        setSendComment(true);
    }

    const mappedComments = post.comments && post.comments.map((comment, index) => {
        return <Comment 
            key={uuidv4()}
            isOdd={index % 2 === 0 ? false : true}
            comment={comment}
        />
    })

    return (   
        <section className="post">
            <a className="post-page-btn post-delete-btn" onClick={() => setDeletePost(true)}>Delete Post</a>
            <h1>{post.title && post.title}</h1>
            <p className="post-body">{post.body && post.body}</p>
            <a className="post-page-btn post-back-btn" onClick={() => props.setPage("home")}>Back Home</a>
            <section className="post-comments">
                <section className="comment-input-container">
                    <input onChange={handleCommentInputChange} name="author" className="comment-author-input" placeholder="Name" />
                    <input onChange={handleCommentInputChange} name="body" className="comment-body-input" placeholder="Comments" />
                    <button onClick={handleCommentSubmit} type="button" className="comment-submit-btn post-page-btn">Submit</button>
                </section>
                <p className="comments-title">Comments</p>
                {post.comments && post.comments.length === 0 ?
                    "Be the first to comment:" : 
                    mappedComments}
            </section>
        </section>
    )
}