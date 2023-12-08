import React from 'react';
import Toolbox from './Toolbox';
import {v4 as uuidv4} from 'uuid';

export default function AddPostForm(props) {

    const [post, setPost] = React.useState({
        title: "",
        body: "",
        author: props.currentUser.username,
        tags: "",
        genre: "",
        personality: "",
        length: "",
        extra: ""
    })
    const [requestBody, setRequestBody] = React.useState(null);

    React.useEffect(() => {
        const url = props.root + `/gpt/prompt`;
        if (requestBody) {
            try {
                async function addPost() {
                    props.setModalBackground(true)
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: 'include',
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody)
                    }).then((res) => res.json())
                    .then((post) => {
                        props.setModalBackground(false);
                        props.setCurrentPost({_id: post._id});
                        props.setPage("post");
                    }).catch((err) => {
                        props.setModalBackground(false);
                        console.log(err);
                        alert("OpenAI Server Error: Please Try Again Later (503)");
                    });
                }
                addPost();
            } catch(err) {
                console.log(err);
            }
        }
    }, [requestBody])


    function handleAddFormInputChange(e) {
        setPost((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const tagArray = post.tags.split(',');
        const lowerTags = tagArray.map((tag) => tag.toLowerCase());
        setRequestBody({
            ...post,
            body: "Write a blog post about " + post.body,
            tags: lowerTags
        })
    }
    
    return (
        <section className="add-post-form-container">
            <h2>Generate Post</h2>
            <form>
                <input 
                    className="add-post-input add-post-title" 
                    type="text" name="title" 
                    onChange={handleAddFormInputChange} 
                    value={post.title}
                    placeholder='Prompt Name' />
                <section className="add-post-body-input-wrapper">
                    <span className="add-post-body-input-default-text">Write a blog post about </span>
                    <textarea 
                        className="add-post-input add-post-body" 
                        type="text" 
                        name="body" 
                        onChange={handleAddFormInputChange} 
                        value={post.body}
                        placeholder='an adventure climbing Mount Everest.'
                    ></textarea>
                </section>
                <input 
                    className="add-post-input add-post-tags" 
                    type="text" 
                    name="tags" 
                    onChange={handleAddFormInputChange} 
                    value={post.tags}
                    placeholder='Tags (Separate with commas)'/>
                <button 
                    className="add-post-submit-btn form-btn" 
                    type="submit" onClick={handleFormSubmit}
                >Submit</button>
                <section className="post-details-container">
                    <p>Genre</p>
                    <select onChange={handleAddFormInputChange} name="genre" className="post-details-select">
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime/Mystery</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="satire">Satire</option>
                        <option value="scifi">Science Fiction</option>
                        <option value="thriller">Thriller</option>
                    </select>
                    <p>Personality of Writer</p>
                    <select onChange={handleAddFormInputChange} name="personality" className="post-details-select">
                        <option value="absent-Minded">Absent-Minded</option>
                        <option value="agreeable">Agreeable</option>
                        <option value="ambitious">Ambitious</option>
                        <option value="authoritarian">Authoritarian</option>
                        <option value="conscientious">Conscientious</option>
                        <option value="cooperative">Cooperative</option>
                        <option value="extraverted">Extraverted</option>
                        <option value="gentle">Gentle</option>
                        <option value="gritful">Gritful</option>
                        <option value="honest">Honest</option>
                        <option value="idiotic">Idiotic</option>
                        <option value="impulsive">Impulsive</option>
                        <option value="insecure">Insecure</option>
                        <option value="intellectual">Intellectual</option>
                        <option value="introverted">Introverted</option>
                        <option value="needy">Needy</option>
                        <option value="neurotic">Neurotic</option>
                        <option value="perfected">Perfected</option>
                        <option value="persistent">Persistent</option>
                        <option value="psychotic">Psychotic</option>
                        <option value="realistic">Realistic</option>
                        <option value="religious">Religious</option>
                        <option value="right-Wing">Right-Wing</option>
                        <option value="snob">Snobby</option>
                    </select>
                    <p>Post Length</p>
                    <select onChange={handleAddFormInputChange} name="length" className="post-details-select">
                        <option value="500">Short {'(<500 Words)'}</option>
                        <option value="1000">Medium {'(<1000 Words)'}</option>
                        <option value="1500">Long {'(<1500 Words)'}</option>
                        <option value="2000">Very Long {'(<2000 Words)'}</option>
                    </select>
                    <p>Additional Criteria</p>
                    <textarea
                        onChange={handleAddFormInputChange}
                        className="post-details-textarea"
                        value={post.extra}
                        name="extra"
                        placeholder="Put anything else here that you want the blog post to contain."
                    ></textarea>
                </section>
            </form>
        </section>
    )
}