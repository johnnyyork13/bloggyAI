import React from 'react';
import PostCard from './PostCard';
import { v4 as uuidv4 } from 'uuid';

export default function PostCardContainer(props) {

    const url = "http://localhost:3000/blog/posts/"

    const [postList, setPostList] = React.useState([]);

    React.useEffect(() => {
        async function getPosts(url) {
            try {
                await fetch(url)
                .then((res) => res.json())
                .then((data) => setPostList(data));
            } catch(err) {
                console.log(err);
            }
        }
        getPosts(url);
    }, []);

    const mappedPosts = postList.map((post) => {
       return (post.title && <PostCard 
                                key={uuidv4()} 
                                post={post} 
                                setPage={props.setPage}
                                setPost={props.setPost}
                            />)
    })

    return (
        <section className="post-card-container-container">
            <p className="post-card-container-container-header">{props.header}</p>
            {mappedPosts.length > 0 ? mappedPosts : "No Posts to Show."}
        </section>
    )
}