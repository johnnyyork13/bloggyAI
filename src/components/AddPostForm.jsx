import React from 'react';
import Toolbox from './Toolbox';
import {v4 as uuidv4} from 'uuid';

export default function AddPostForm(props) {

    const [postExtraDetails, setPostExtraDetails] = React.useState({
        genre: "action",
        personality: "absent-minded",
        length: "500",
        extra: ""
    })
    const [postRequiredFields, setPostRequiredFields] = React.useState({
        title: "",
        body: "",
        tags: "",
        author: props.currentUser.username,
    })
    const [postFormError, setPostFormError] = React.useState({
        title: false,
        body: false,
        tags: false
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


    function handleAddFormRequiredInputChange(e) {
        setPostRequiredFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleAddFormExtraDetailsInputChange(e) {
        setPostExtraDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    
    function handleFormSubmit() {
        let allFieldsHaveValues = true;
        for (const key in postRequiredFields) {
            if (postRequiredFields[key] === "") {
                allFieldsHaveValues = false;
                setPostFormError((prev) => ({
                    ...prev,
                    [key]: true
                }))
            } else {
                setPostFormError((prev) => ({
                    ...prev,
                    [key]: false
                }))
            }
        }
        if (allFieldsHaveValues) {
            const tagArray = postRequiredFields.tags.split(',');
            const lowerTags = tagArray.map((tag) => tag.toLowerCase());
            setRequestBody({
                ...postRequiredFields,
                ...postExtraDetails,
                body: "Write a blog post about " + postRequiredFields.body,
                tags: lowerTags
            })
        }
    }
    
    return (
        <section className="add-post-form-container">
            <form>
                <h2>Generate Post</h2>
                <label className="login-container-label" htmlFor="title"> {postFormError.title && "Please Enter a Title"}
                    <input
                        className="add-post-input add-post-title"
                        type="text" 
                        name="title"
                        onChange={handleAddFormRequiredInputChange}
                        value={postRequiredFields.title}
                        placeholder='Prompt Name' />
                </label>
                <label className="login-container-label" htmlFor="body"> {postFormError.body && "Please Enter a Prompt"}
                    <section className="add-post-body-input-wrapper">
                        <span className="add-post-body-input-default-text">Write a blog post about </span>
                        <textarea
                            className="add-post-input add-post-body"
                            type="text"
                            name="body"
                            onChange={handleAddFormRequiredInputChange}
                            value={postRequiredFields.body}
                            placeholder='an adventure climbing Mount Everest.'
                        ></textarea>
                    </section>
                </label>
                <label className="login-container-label" htmlFor="tags"> {postFormError.tags && "Please Enter at Least One Tag"}
                    <input
                        className="add-post-input add-post-tags"
                        type="text"
                        name="tags"
                        onChange={handleAddFormRequiredInputChange}
                        value={postRequiredFields.tags}
                        placeholder='Tags (Separate with commas)'/>
                </label>
                <button 
                    className="add-post-submit-btn form-btn" 
                    type="button" onClick={handleFormSubmit}
                >Submit</button>
            </form>
            <section className="post-details-container">
                    <p>Genre</p>
                    <select onChange={handleAddFormExtraDetailsInputChange} name="genre" className="post-details-select">
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
                    <select onChange={handleAddFormExtraDetailsInputChange} name="personality" className="post-details-select">
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
                    <select onChange={handleAddFormExtraDetailsInputChange} name="length" className="post-details-select">
                        <option value="500">Short {'(<500 Words)'}</option>
                        <option value="1000">Medium {'(<1000 Words)'}</option>
                        <option value="1500">Long {'(<1500 Words)'}</option>
                        <option value="2000">Very Long {'(<2000 Words)'}</option>
                    </select>
                    <p>Additional Criteria</p>
                    <textarea
                        onChange={handleAddFormExtraDetailsInputChange}
                        className="post-details-textarea"
                        value={postExtraDetails.extra}
                        name="extra"
                        placeholder="Put anything else here that you want the blog post to contain."
                    ></textarea>
                </section>
        </section>
    )
}