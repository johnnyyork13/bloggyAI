import React from 'react';

export default function Comment(props) {

    return (
        <section className={`comment-container ${props.isOdd ? "comment-left" : "comment-right"}`}>
            <p className="comment-author">Submitted by {props.comment.author}</p>
            <p className="comment-body">{props.comment.body}</p>
        </section>
    )
}