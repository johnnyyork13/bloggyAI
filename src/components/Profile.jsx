import React from 'react';
import PostCard from './PostCard';
import {v4 as uuidv4} from 'uuid';
import '../assets/styles/profile.css';

export default function Profile(props) {

    const [userPosts, setUserPosts] = React.useState([]);

    React.useEffect(() => {
        try {
            const url = props.root + `/user/${props.currentUser.username}/posts`;
            async function getUserPosts() {
                await fetch(url, {
                    credentials: 'include',
                })
                .then((res) => res.json())
                .then((posts) => setUserPosts(posts.postList))
                .catch((err) => console.log(err));
            }   
            getUserPosts();
        } catch(err) {
            console.log(err);
        }
    }, []);

    const mappedPosts = userPosts.length > 0 && userPosts.map((post) => {
        return <PostCard 
                key={uuidv4()}
                post={post}
                setPage={props.setPage}
                setCurrentPost={props.setCurrentPost}
            /> 
    })

    return (
        <section className="profile-container">
            {props.currentUser.displayName}'s Posts
            <section className="profile-body-container">
                <section className="profile-post-container">
                    {mappedPosts}
                </section>
                <aside className="profile-sidebar">
                    Liked Posts:
                </aside>
            </section>
        </section>
    )
}