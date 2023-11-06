import React from 'react';

export default function AddPostForm(props) {

    const url = `http://localhost:3000/blog/user/${props.currentUser}/post/add`;

    const [post, setPost] = React.useState({
        title: "",
        body: "",
        author: props.currentUser.username,
        tags: "",
    })

    function handleFormChange(e) {
        setPost((prev) => ({
          ...prev,
          [e.target.name] : e.target.value
        }))
      }

    return (
        <section className="add-post-form-container">
            <h2>Add Post</h2>
            <form>
                <input className="add-post-input add-post-title" type="text" name="title" onChange={handleFormChange} placeholder='Title' />
                <textarea className="add-post-input add-post-body" type="text" name="body" onChange={handleFormChange} placeholder='Post Body'></textarea>
                <input className="add-post-input add-post-tags" type="text" name="tags" onChange={handleFormChange} placeholder='Tags (Separate with commas)'/>
                <button className="add-post-submit-btn form-btn" type="submit" onClick={(e) => props.handleFormSubmit(e, post, url)}>Submit</button>
            </form>
        </section>
    )
}