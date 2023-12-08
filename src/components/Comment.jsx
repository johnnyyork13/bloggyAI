import React from 'react';
import convertDate from '../utils/convertDate';

export default function Comment(props) {

    const d = convertDate(props.comment.date);
    const date = d[0];
    const time = d[1];

    const [deleteComment, setDeleteComment] = React.useState(false);

    React.useEffect(() => {
        if (deleteComment) {
            async function postDeleteComment() {
                const url = props.root + '/post/comment/delete';
                fetch(url, {
                    method: "POST",
                    mode: "cors",
                    credentials: 'include',
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({commentID: props.comment._id})
                }).then((res) => res.json())
                .then((res) => props.setRender((prev) => !prev));
            }
            postDeleteComment();
        }
    }, [deleteComment])

    return (
        <section className={`comment-container ${props.isOdd ? "comment-left" : "comment-right"}`}>
            {props.currentUser && props.comment.author === props.currentUser.username && <a 
                className="comment-delete-btn post-page-btn"
                onClick={() => setDeleteComment(true)}>
                Delete</a>}
            <p className="comment-author">Submitted by <a
                    onClick={() => {
                        props.setPage("profile");
                        props.setCurrentUser((prev) => ({
                            ...prev,
                            visiting: props.comment.author
                        }))
                    }}
                >{props.comment.author}
                </a> on {date}, {time}</p>
            <p className="comment-body">{props.comment.body}</p>
        </section>
    )
}