import React from 'react';
import Comment from './Comment';
import {v4 as uuidv4} from 'uuid'; 
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from './Modal';

export default function Post(props) {
    const [post, setPost] = React.useState({
        title: "",
        body: "",
        author: "",
        tags: [],
        comments: [],
    });
    const [deletePost, setDeletePost] = React.useState(false);
    const [comment, setComment] = React.useState({
        author: "",
        body: "",
        date: ""
    });
    const [addComment, setAddComment] = React.useState(false);
    const [deleteComment, setDeleteComment] = React.useState(null);
    const [likedPost, setLikedPost] = React.useState(null);
    const [render, setRender] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [modalDetails, setModalDetails] = React.useState({
        text: "Are you sure you want to delete this post?",
        includeGoBackBtn: true,
    })

    React.useEffect(() => {
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
        getPost();
    }, [addComment, render, props.currentPost, deleteComment]);

    React.useEffect(() => {
        const url = props.root + `/post/delete`;
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
                    .then(() => {
                        setModalDetails({
                            text: "Post was Successfully Deleted!",
                            includeGoBackBtn: false,
                        })
                        //props.setPage("home")
                        //setShowModal(false);
                    });
                }
            } catch(err) {
                console.log(err);
            }
        }
        handleDeletePost();
    }, [deletePost])

    React.useEffect(() => {
        async function postAddComment() {
            if (addComment) {
                try {
                    const url = props.root + `/post/addComment`;
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
                    .then((res) => setAddComment(false));
                } catch(err) {
                    console.log(err);
                }
            }
        }
        postAddComment();
    }, [addComment])

    React.useEffect(() => {
        try {
            if (likedPost !== null && props.currentUser.username !== post.author) {
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
                            username: props.currentUser.username,
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
            author: props.currentUser.username,
            date: new Date(),
            _id: uuidv4()
        }))
        setAddComment(true);
    }

    function handleLikeButtonClick(bool) {
        if (!props.currentUser) {
            props.setModalBackground(true);
        } else {
            setLikedPost(bool);
        }
    }

    const mappedComments = post.comments && post.comments.map((comment, index) => {
        return <Comment 
            key={uuidv4()}
            root={props.root}
            isOdd={index % 2 === 0 ? false : true}
            comment={comment}
            setPage={props.setPage}
            setCurrentUser={props.setCurrentUser}
            currentUser={props.currentUser}
            setRender={setRender}
        />
    })

    const mappedTags = post.tags.map((tag, index) => {
        return <span 
                    key={uuidv4()}
                    onClick={() => {
                        props.setPage('browse');
                        props.setBrowseKey({
                            tag: tag,
                            user: null,
                            genre: null 
                        })
                    }}
                    className="tag"> {tag}{index < post.tags.length - 1 ? "," : ""}
                </span>
    })

    return (   
        <section className="post">
            {showModal && <Modal 
                text={modalDetails.text}
                setPage={props.setPage}
                setShowModal={setShowModal}
                goToPage="home"
                includeGoBackBtn={modalDetails.includeGoBackBtn}
                modalFunction={setDeletePost}
                modalFunctionValue={true}
            />}
            <section className="post-title">
                <div className="post-likes">
                    <div className="post-likes-count">
                        <FavoriteIcon />{post.likes}
                    </div>
                    <div className="post-likes-icons">
                        <button onClick={() => handleLikeButtonClick(false)}><ThumbDownAltOutlinedIcon /></button>
                        <button onClick={() => handleLikeButtonClick(true)}><ThumbUpAltOutlinedIcon /></button>
                    </div>
                </div>
                <p className="post-title-header">
                    {post.title}
                </p>
                {(props.currentUser && 
                    (props.currentUser.username === post.author || 
                        props.currentUser.membership === "admin")) &&
                        <a className="post-delete-btn"
                            onClick={() => setShowModal(true)}
                        >Delete Post</a>}
            </section>
            <p className="post-title-sub">Prompt created by <a 
                    onClick={() => {
                        props.setCurrentUser((prev) => {
                        return {
                            ...prev, 
                            visiting: post.author
                        }});
                        props.setPage("profile");
                    }}
                    className="post-title-sub-author"
                >{post.author}</a>
            </p>
            <p className="post-body">{post.body}</p>
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