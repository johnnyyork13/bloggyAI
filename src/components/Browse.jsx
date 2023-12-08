import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../assets/styles/browse.css';
import PostCard from '../components/PostCard';

export default function Browse(props) {

    const [tagsList, setTagsList] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const [fetchData, setFetchData] = React.useState(false);


    React.useEffect(() => {
        async function getTags() {
            const url = props.root + '/posts/allTags';
            await fetch(url)
            .then((res) => res.json())
            .then((data) => setTagsList(data.tagsList))
            .catch((err) => console.log(err));
        }
        getTags();
    }, []);

    React.useEffect(() => {
        async function getSearchResults() {
            const url = props.root + '/posts/browse'
            await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({browseKey: props.browseKey})
            }).then((res) => res.json())
            .then((data) => setSearchResults(data.postList))
            .catch((err) => console.log(err));
        }
        getSearchResults();
        //write genre fetch request
    }, [props.browseKey]);

    function handleGenreClick() {

    }

    const mappedSearchResults = searchResults.map((post) => {
        return <PostCard 
                setPage={props.setPage}
                setCurrentPost={props.setCurrentPost}
                key={uuidv4()}
                post={post}
            />
    })

    const mappedTagsList = tagsList.map((tag) => {
        return <a 
                    onClick={() => props.setBrowseKey({
                        tag: tag.trim().toLowerCase(),
                        user: null,
                        genre: null,
                    })}
                    key={uuidv4()}>
                {tag}</a>
    })

    return (
        <section className="browse-container">
            <p className="browse-container-header">Browse Posts</p>
            <section className="browse-genre-sidebar">
                <p className="browse-genre-header">Genres</p>
                <a onClick={() => handleGenreClick("action")}>Action</a>
                <a onClick={() => handleGenreClick("adventure")}>Adventure</a>
                <a onClick={() => handleGenreClick("comedy")}>Comedy</a>
                <a onClick={() => handleGenreClick("crime")}>Crime/Mystery</a>
                <a onClick={() => handleGenreClick("fantasy")}>Fantasy</a>
                <a onClick={() => handleGenreClick("historical")}>Historical</a>
                <a onClick={() => handleGenreClick("horror")}>Horror</a>
                <a onClick={() => handleGenreClick("romance")}>Romance</a>
                <a onClick={() => handleGenreClick("satire")}>Satire</a>
                <a onClick={() => handleGenreClick("scifi")}>Science Fiction</a>
                <a onClick={() => handleGenreClick("thriller")}>Thriller</a>
            </section>
            <section className="browse-results">
                {mappedSearchResults}
            </section>
            <section className="browse-tags-sidebar">
                <p className="browse-tags-header">Popular Tags</p>
                {mappedTagsList}
                <p className="browse-tags-header">Recent Tags</p>
                
            </section>
        </section>
    )
}