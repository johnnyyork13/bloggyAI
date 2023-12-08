import React from 'react';
import {v4 as uuidv4} from 'uuid';

export default function SearchBar(props) {

    const [searchList, setSearchList] = React.useState([])
    const [searchResults, setSearchResults] = React.useState([])

    React.useEffect(() => {
        try {
            const url = props.root + '/posts/search';
            async function getPosts() {
                await fetch(url)
                .then((res) => res.json())
                .then((posts) => setSearchList([
                    ...posts.postList
                ]))
                .catch((err) => {
                    console.log(err);
                });
            }
            getPosts();
        } catch(err) {
            console.log(err);
        }
    }, [])

    function handleSearchInputChange(e) {
        setSearchResults(() => {
            return searchList.filter((post) => {
                const search = e.target.value.toLowerCase();
                const tags = post.tags.map((tag) => tag.trim().toLowerCase());
                const title = post.title.toLowerCase();
                return (title.includes(search) ||
                        tags.includes(search)) && post;
            }).slice(0, 10);
        })
    }

    const mappedSearchResults = searchResults.map((post) => {
        return <a 
                key={uuidv4()}
                onClick={() => {
                    props.setCurrentPost(post);
                    props.setPage("post");
                }}
                className="search-result">
                {post.title} <p>(tags: {post.tags.join(",")})</p>
            </a>
    })

    return (
        <section className="search-posts-container">
            <input
                className="search-input"
                onChange={handleSearchInputChange} 
                type="search" 
                name="query" 
                placeholder="Search by Title, Keywords, or Tags" />
            <section className="search-results-container">
                {mappedSearchResults}
            </section>
        </section>
    )
}