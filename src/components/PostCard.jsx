import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PostCard(props) {

    function handlePostCardClick() {
        props.setPage("post");
        props.setCurrentPost(props.post);
    }

    return (
        <section className="post-card-container" onClick={handlePostCardClick}>
            <p className="post-card-title">{props.post.title}</p>
            <p className="post-card-body">{props.post.body.slice(0,30)}...</p>
            {props.page !== "profile" && <span className="post-card-author"><p>{props.post.author}</p></span>}
            {<span className="post-card-favorite-icon"><FavoriteIcon /><p>{props.post.likes}</p></span>}
        </section>
    )
}