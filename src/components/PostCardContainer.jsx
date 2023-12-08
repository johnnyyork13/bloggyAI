import React from 'react';
import PostCard from './PostCard';
import PostSidebar from './PostSidebar';
import { v4 as uuidv4 } from 'uuid';

export default function PostCardContainer(props) {

    const url = props.root + "/posts/"

    const [recentPosts, setRecentPosts] = React.useState([]);
    const [topRatedPosts, setTopRatedPosts] = React.useState([]);

    React.useEffect(() => {
        async function getPosts(url) {
            try {
                await fetch(url, {
                    credentials: 'include',
                })
                .then((res) => res.json())
                .then((data) => {
                    setRecentPosts(data.recentPosts);
                    setTopRatedPosts(data.topRatedPosts);
                });
            } catch(err) {
                console.log(err);
            }
        }
        getPosts(url);
    }, []);


    const mappedRecentPosts = recentPosts.map((post) => {
       return (post.title && <PostCard 
                                key={uuidv4()} 
                                post={post} 
                                setPage={props.setPage}
                                page={props.page}
                                setCurrentPost={props.setCurrentPost}
                            />)
    })

    const mappedTopRatedPosts = topRatedPosts.map((post) => {
        return (post.title && <PostCard 
            key={uuidv4()} 
            post={post} 
            setPage={props.setPage}
            page={props.page}
            setCurrentPost={props.setCurrentPost}
        />)
    })

    return (
        <section className="post-card-container-container">
            <p className="post-card-container-container-header">New Posts</p>
            <section className="post-card-container-section">
                {mappedRecentPosts.length > 0 ? mappedRecentPosts : "No Posts to Show."}
            </section>
            <p 
                onClick={() => {props.setBrowseKey({
                    tag: null,
                    user: null,
                    genre: null,
                    new: true,
                    top: null,
                    })
                    props.setPage("browse");
        }
    }
                className="more-recent-posts more-link"
                >More</p>
            <p className="post-card-container-container-header">Top Rated Posts</p>
            <section className="post-card-container-section">
                {mappedTopRatedPosts.length > 0 ? mappedTopRatedPosts : "No Posts to Show."}
            </section>
            <p 
                onClick={() => {props.setBrowseKey({
                                tag: null,
                                user: null,
                                genre: null,
                                new: null,
                                top: true,
                                })
                                props.setPage("browse");
                    }
                }
                className="more-top-rated-posts more-link"
                >More</p>
        </section>
    )
}