import React from 'react';
import Comment from './Comment';
import {v4 as uuidv4} from 'uuid'; 
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Post(props) {
    //console.log(props.currentUser);

    const [post, setPost] = React.useState({
        title: "",
        body: "",
        author: "",
        tags: [],
        comments: "",
    });
    const [deletePost, setDeletePost] = React.useState(false);
    const [comment, setComment] = React.useState({
        author: "",
        body: "",
        date: ""
    });
    const [sendComment, setSendComment] = React.useState(false);
    const [likedPost, setLikedPost] = React.useState(null);
    const [render, setRender] = React.useState(false);

    async function getPost() {
        try {
            const url = props.root + `/post/${props.currentPost._id}`;
            await fetch(url, {
                credentials: 'include',
            })
            .then((res) => res.json())
            .then((data) => setPost(data));
        } catch(err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getPost();
    }, [sendComment, render]);

    React.useEffect(() => {
        const url = props.root + `/post/${props.currentPost._id}/delete`;
        async function handleDeletePost() {
            try {
                if (deletePost) {
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({postID: props.currentPost._id})
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
                    const url = props.root + `/post/${props.currentPost._id}/addComment`;
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: 'include',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            postID: props.currentPost._id,
                            comment: comment
                        })
                    }).then((res) => res.json())
                    .then((res) => setSendComment(false));
                } catch(err) {
                    console.log(err);
                }
            }
        }
        addComment();
    }, [sendComment])

    React.useEffect(() => {
        try {
            if (likedPost !== null) {
                const url = props.root + `/user/votePost`;
                async function votePost() {
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: 'include',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            likedPost: likedPost,
                            postID: props.currentPost._id,
                            userID: props.currentUser._id,
                        })
                    }).then((res) => res.json())
                    .then(() => {
                        setRender((prev) => !prev); 
                    })
                }
                votePost();    
            }
        } catch(err) {
            console.log(err);
        }
    },  [likedPost])

    function handleCommentInputChange(e) {
        setComment((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    function handleCommentSubmit() {
        setComment((prev) => ({
            ...prev,
            author: props.currentUser.displayName,
            date: new Date()
        }))
        setSendComment(true);
    }

    function handleLikeButtonClick(val) {
        if (!props.currentUser) {
            props.setModalBackground(true);
        } else {
            setLikedPost(val);
        }
    }

    const mappedComments = (post && post.comments) && post.comments.map((comment, index) => {
        return <Comment 
            key={uuidv4()}
            isOdd={index % 2 === 0 ? false : true}
            comment={comment}
        />
    })

    const mappedTags = (post && post.tags) && post.tags.map((tag, index) => {
        return <span 
                    key={uuidv4()}
                    className="tag">
                    {tag}{index < post.tags.length - 1 ? "," : ""}
                </span>
    })

    return (   
        <section className="post">
            <section className="post-title">
                <div className="post-likes">
                    <div className="post-likes-count">
                        <FavoriteIcon />{(post && post.likes) && post.likes}
                    </div>
                    <div className="post-likes-icons">
                        <button onClick={() => handleLikeButtonClick(false)}><ThumbDownAltOutlinedIcon /></button>
                        <button onClick={() => handleLikeButtonClick(true)}><ThumbUpAltOutlinedIcon /></button>
                    </div>
                </div>
                <p className="post-title-header">
                    {(post && post.title) && post.title}
                </p>
                {(props.currentUser && post && post.author) &&
                    props.currentUser.username === post.author &&
                        <a className="post-delete-btn"
                            onClick={() => setDeletePost(true)}
                        >Delete Post</a>}
            </section>
            <p className="post-title-sub">Prompt created by <span className="post-title-sub-author">{post.author}</span></p>
            <p className="post-body">{(post && post.body) && post.body}</p>
            <p className="post-tags">Tags: {mappedTags}</p>
            <a className="post-page-btn post-back-btn" 
                onClick={() => props.setPage("home")}
            >Back Home</a>
            <section className="post-comments">
                {props.currentUser ? <section className="comment-input-container">
                    <textarea 
                        onChange={handleCommentInputChange} 
                        name="body" 
                        className="comment-body-input" 
                        placeholder="Comments" />
                    <button 
                        onClick={handleCommentSubmit} 
                        type="button" 
                        className="comment-submit-btn post-page-btn"
                    >Submit</button>
                </section> : <p className="comment-login-notification">You must be logged in to add comments. <span className="comment-login-btn" onClick={() => props.setPage("login")}>Log In</span></p>}
                <p className="comments-title">Comments</p>
                {post.comments && post.comments.length === 0 ?
                    <p className="comment-first-notification">Be the first to comment.</p> : 
                    mappedComments}
            </section>
        </section>
    )
}