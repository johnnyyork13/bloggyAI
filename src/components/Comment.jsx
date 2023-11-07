import React from 'react';
import convertDate from '../utils/convertDate';

export default function Comment(props) {

    const d = convertDate(props.comment.date);
    const date = d[0];
    const time = d[1];

    return (
        <section className={`comment-container ${props.isOdd ? "comment-left" : "comment-right"}`}>
            <p className="comment-author">Submitted by {props.comment.author} on {date}, {time}</p>
            <p className="comment-body">{props.comment.body}</p>
        </section>
    )
}