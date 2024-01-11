import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../assets/styles/browse.css';
import PostCard from '../components/PostCard';

export default function Browse(props) {

    const [popularTags, setPopularTags] = React.useState([]);
    const [newTags, setNewTags] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState([]);
    const [fetchData, setFetchData] = React.useState(false);
    const [browseHeaderText, setBrowseHeaderText] = React.useState("");
    const [openSmallGenre, setOpenSmallGenre] = React.useState(false);
    const [openSmallTag, setOpenSmallTag] = React.useState(false);

    React.useEffect(() => {
        async function getTags() {
            const url = props.root + '/posts/allTags';
            await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setPopularTags(data.popularTags);
                setNewTags(data.newTags);
            })
            .catch((err) => console.log(err));
        }
        async function getDefaultSearchResults() {
            const url = props.root + '/posts/browse/default';
            await fetch(url)
            .then((res) => res.json())
            .then((data) => setSearchResults(data.postList))
            .catch((err) => console.log(err));
        }
        getTags();
        getDefaultSearchResults();
    }, []);

    React.useEffect(() => {
        const checkBrowseKey = () => {
            for (const key in props.browseKey) {
                if (props.browseKey[key]) {
                    return true;
                }
            }
        }
        if (checkBrowseKey()) {
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
            //set browse result header
            setBrowseHeaderText(() => {
                for (const key in props.browseKey) {
                    if (props.browseKey[key]) {
                        if (typeof props.browseKey[key] === 'string') {
                            return props.browseKey[key][0].toUpperCase() + props.browseKey[key].slice(1);
                        } else {
                            return key[0].toUpperCase() + key.slice(1);
                        }
                    }
                }
            })
        }
    }, [props.browseKey]);

    function handleGenreClick(genre) {
        props.setBrowseKey({
            tag: null,
            user: null,
            genre: genre,
            new: null,
            top: null,
        })
    }

    const mappedSearchResults = searchResults.map((post) => {
        return <PostCard 
                setPage={props.setPage}
                setCurrentPost={props.setCurrentPost}
                key={uuidv4()}
                post={post}
            />
    })

    const mappedPopularTags = popularTags.map((tag) => {
        return <a 
                    onClick={() => props.setBrowseKey({
                        tag: tag.trim().toLowerCase(),
                        user: null,
                        genre: null,
                        new: null,
                        top: null,
                    })}
                    key={uuidv4()}>
                {tag}</a>
    })
    const mappedNewTags = newTags.map((tag) => {
        return <a 
                    onClick={() => props.setBrowseKey({
                        tag: tag.trim().toLowerCase(),
                        user: null,
                        genre: null,
                        new: null,
                        top: null,
                    })}
                    key={uuidv4()}>
                {tag}</a>
    })

    return (
        <section className="browse-container">
            <p className="browse-container-header">Browse Posts {browseHeaderText.length > 0 ? 'by' : ''} {browseHeaderText}</p>
            <section className="browse-genre-sidebar-small">
                <div onClick={() => setOpenSmallGenre((prev) => !prev)} className="browse-genre-sidebar-small-header"><span>Browse by Genre</span><span className={`small-down-arrow ${openSmallGenre && "animate-arrow-spin"}`}></span></div>
                {openSmallGenre && <section className="browse-genres-small">
                <p className="browse-genre-header">Category</p>
                    <a onClick={() => props.setBrowseKey({
                        tag: null,
                        user: null,
                        genre: null,
                        new: null,
                        top: true,
                    })}>Top</a>
                    <a onClick={() => props.setBrowseKey({
                        tag: null,
                        user: null,
                        genre: null,
                        new: true,
                        top: false,
                    })}>New</a>
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
                </section>}
            </section>
            <section className="browse-tag-sidebar-small">
                <div onClick={() => setOpenSmallTag((prev) => !prev)} className="browse-tag-sidebar-small-header">Browse by Tag <div className={`small-down-arrow ${openSmallTag && "animate-arrow-spin"}`}></div></div>
                {openSmallTag && <section className="browse-tags-small">
                    <p className="browse-tags-header">Popular Tags</p>
                    {mappedPopularTags}
                    <p className="browse-tags-header">New Tags</p>
                    {mappedNewTags}
                </section>}
            </section>
            <section className="browse-genre-sidebar">
                <p className="browse-genre-header">Category</p>
                <a onClick={() => props.setBrowseKey({
                    tag: null,
                    user: null,
                    genre: null,
                    new: null,
                    top: true,
                })}>Top</a>
                <a onClick={() => props.setBrowseKey({
                    tag: null,
                    user: null,
                    genre: null,
                    new: true,
                    top: false,
                })}>New</a>
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
                {mappedSearchResults.length > 0 ? mappedSearchResults : <p className="browse-results-no-posts">No posts match this criteria yet...</p>}
            </section>
            <section className="browse-tags-sidebar">
                <p className="browse-tags-header">Popular Tags</p>
                {mappedPopularTags}
                <p className="browse-tags-header">New Tags</p>
                {mappedNewTags}
            </section>
        </section>
    )
}