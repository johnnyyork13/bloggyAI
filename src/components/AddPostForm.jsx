import React from 'react';
import Toolbox from './Toolbox';
import {v4 as uuidv4} from 'uuid';

export default function AddPostForm(props) {

    const [post, setPost] = React.useState({
        title: "",
        body: "",
        author: props.currentUser.username,
        tags: "",
    })

    const url = `http://localhost:3000/gpt/prompt`;

    function handleAddFormInputChange(e) {
        setPost((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleFormSubmit(e) {
        const updatedPost = {
            ...post,
            body: "Write a blog post about " + post.body
        }
        props.handleAddPostFormSubmit(e, updatedPost, url)
    }
    console.log(post.body);
    
    return (
        <section className="add-post-form-container">
            <h2>Add Post</h2>
            <form>
                <input className="add-post-input add-post-title" type="text" name="title" onChange={handleAddFormInputChange} placeholder='Title' />
                <section className="add-post-body-input-wrapper">
                    <span className="add-post-body-input-default-text">Write a blog post about </span>
                    <textarea 
                        className="add-post-input add-post-body" 
                        type="text" 
                        name="body" 
                        onChange={handleAddFormInputChange} 
                        placeholder='an adventure climbing Mount Everest.'
                    ></textarea>
                </section>
                <input className="add-post-input add-post-tags" type="text" name="tags" onChange={handleAddFormInputChange} placeholder='Tags (Separate with commas)'/>
                <button 
                    className="add-post-submit-btn form-btn" 
                    type="submit" onClick={handleFormSubmit}
                >Submit</button>
            </form>
        </section>
    )
}