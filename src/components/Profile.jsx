import React from 'react';
import PostCard from './PostCard';
import {v4 as uuidv4} from 'uuid';
import '../assets/styles/profile.css';

export default function Profile(props) {

    const [recentPosts, setRecentPosts] = React.useState([]);
    const [likedPosts, setLikedPosts] = React.useState([]);
    const [topRatedPosts, setTopRatedPosts] = React.useState([]);
    const [likedPostClick, setLikedPostClick] = React.useState(null);

    React.useEffect(() => {
        try {
            const url = props.root + `/user/${props.currentUser.visiting}/profile`;
            async function getUserPosts() {
                await fetch(url, {
                    credentials: 'include',
                })
                .then((res) => res.json())
                .then((posts) => {
                    setRecentPosts(posts.userPosts);
                    setLikedPosts(posts.likedPosts);
                    setTopRatedPosts(posts.topRatedPosts);
                })
                .catch((err) => console.log(err));
            }   
            getUserPosts();
        } catch(err) {
            console.log(err);
        }
    }, [props.currentUser.visiting]);

    React.useEffect(() => {
        if (likedPostClick) {
            props.setCurrentPost(likedPostClick);
            props.setPage("post");
        }
    }, [likedPostClick])    

    const mappedRecentPosts = recentPosts.map((post) => {
        return <PostCard 
                key={uuidv4()}
                post={post}
                setPage={props.setPage}
                page={props.page}
                setCurrentPost={props.setCurrentPost}
            /> 
    })

    const mappedTopRatedPosts = topRatedPosts.map((post) => {
        return <PostCard 
                key={uuidv4()}
                post={post}
                setPage={props.setPage}
                page={props.page}
                setCurrentPost={props.setCurrentPost}
            /> 
    })

    const mappedLikedPosts = likedPosts.map((post) => {
        return <span 
                    className="liked-post"
                    onClick={() => setLikedPostClick(post)}>
                <a>{post.title}</a>
                </span>
    })

    return (
        <section className="profile-container">
            <section className="profile-body-container">
                <section className="profile-post-container">
                    <p className="profile-post-container-header">{props.currentUser.visiting}'s Posts</p>
                    <p className="profile-post-top-rated-header profile-post-container-sub-header">Top Rated Posts</p>
                    <section className="profile-post-top-rated profile-post-section">
                        {mappedTopRatedPosts}
                    </section>
                    <p className="profile-post-top-rated-header profile-post-container-sub-header">Recent Posts</p>
                    <section className="profile-post-recent profile-post-section">
                        {mappedRecentPosts}
                    </section>
                </section>
                {props.currentUser.visiting === props.currentUser.username && <aside className="profile-sidebar">
                    <p className="profile-sidebar-header">Liked Posts:</p>
                    {mappedLikedPosts.length > 0 ? mappedLikedPosts : 'Like posts show up here.'}
                </aside>}
            </section>
        </section>
    )
}