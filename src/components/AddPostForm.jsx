import React from 'react';
import Toolbox from './Toolbox';
import {v4 as uuidv4} from 'uuid';

export default function AddPostForm(props) {

    const [post, setPost] = React.useState({
        title: "",
        body: "",
        author: props.currentUser.username,
        tags: ""
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
            </form>
        </section>
    )
}