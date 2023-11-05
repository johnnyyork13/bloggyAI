import React from 'react';

export default function PostCard(props) {

    function handlePostCardClick() {
        props.setPage("post");
        props.setPost(props.post);
    }

    //console.log(props.post._id);

    return (
        <section className="post-card-container" onClick={handlePostCardClick}>
            <p className="post-card-title">{props.post.title}</p>
            <p className="post-card-body">{props.post.body}</p>
        </section>
    )
}