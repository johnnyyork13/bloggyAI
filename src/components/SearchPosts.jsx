import React from 'react';
import '../assets/styles/search.css';
import PostCardContainer from './PostCardContainer';

export default function SearchPosts(props) {

    const [postList, setPostList] = React.useState([])
    const [searchList, setSearchList] = React.useState([])
    const [search, setSearch] = React.useState({
        title: "",
        tags: ""
    })

    React.useEffect(() => {
        try {
            const url = props.root;
            async function getPosts() {
                await fetch(url)
                .then((res) => res.json())
                .then((posts) => setPostList([
                    ...posts.postList
                ]));
            }
            getPosts();
        } catch(err) {
            console.log(err);
        }
    }, [])

    React.useEffect(() => {
        if (postList.length > 0) {
            try {
                setSearchList(() => {
                    const list = postList.filter(function(post){
                        const lowerTitle = post.title.toLowerCase();
                        const lowerQuery = search.query.toLowerCase();
                        const lowerTags = search.tags.split(",").map((tag) => tag.toLowerCase()).join(",");
                        if (lowerTitle.startsWith(lowerQuery) ||
                            post.tags.includes(lowerTags)) {
                            return post;
                        }
                    });
                    //console.log(list);
                    return list;
                })
            } catch(err) {
                console.log(err);
            }
        }
    }, [search])

    function handleSearchInputChange(e) {
        setSearch((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    //console.log("SEARCH", searchList[0]);

    const mappedPosts = searchList.map((post) => {
        return <p>{post.title}</p>
    })

    return (
        <section className="search-posts-container">
            <p className="search-posts-header">Title Search</p>
            <input
                className="search-input"
                onChange={handleSearchInputChange} 
                type="search" 
                name="query" 
                placeholder="Search for posts" />
            or
            <input
                className="search-input"
                onChange={handleSearchInputChange} 
                type="search" 
                name="query" 
                placeholder="Search by keyword. (Seperate words with commas)" />
            {mappedPosts}
        </section>
    )
}