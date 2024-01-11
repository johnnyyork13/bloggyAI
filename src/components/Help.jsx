import React from 'react';

export default function Help(props) {

    return (
        <div className="help-container">
            <div className="help">
                <p className="help-main-header">How to use BloggyAI</p>
                <div className="help-section">
                    <p className="help-section-header">Creating a Post</p>
                    <p className="help-section-body">
                        To generate a new post, click the ADD POST link located in the header. 
                    </p>
                    <p className="help-section-body">
                        Next, in the provided input fields enter a prompt name and prompt body. The prompt
                        name is used to describe what the generated blog post will be about, and the prompt
                        body will be used as context by our AI to generate the blog post. 
                    </p>
                    <p className="help-section-body">
                        Next, enter at least one tag in the tag input field. This is used to aid other 
                        users in finding your prompt.
                    </p>
                    <p className="help-section-body">
                        Lastly, you can include additional information about the post, like its intended genre,
                        writer personality, post length, and any additional criteria you wish to provide for context 
                        to generate the desired blog post.
                    </p>
                    <p className="help-section-body">
                        Once you have finalized your post's details, click the submit button to generate the post.
                        The post will typically be ready in 30 seconds, and you will be redirected to the post's 
                        page for reviewing.
                    </p>
                </div>
                <div className="help-section">
                    <p className="help-section-header">Interacting with Community Posts</p>
                    <p className="help-section-body">
                        Posts that belong to other users can be favorited and saved to your profile. This can 
                        be achieved next to the post's title, via the thumbs up button. You 
                        also have the ability to comment on posts, if you feel the need. The comment section can be
                        found at the bottom of the post's page.
                    </p>
                    <p className="help-section-body">
                        If you enjoyed another user's post, you can click on their name in the post's header 
                        and view their profile to see other posts they have generated.
                    </p>
                    <p className="help-section-body">
                        Tags are also visible on the post's page, and allow searching by the selected tag once clicked
                        on. 
                    </p>
                </div>
                <div className="help-section">
                    <p className="help-section-header">Browsing Posts</p>
                    <p className="help-section-body">
                        Once logged in, you can browse posts by clicking the BROWSE button 
                        located in the drop down menu under your name in the header.
                        This page allows searching by category, genre, and new or popular tags.
                    </p>
                    <p className="help-section-body">
                        Once a desirable post is listed, you can click on to view the post in its entirety. 
                    </p>
                    <p className="help-section-body">
                        You can also search posts via the search bar in the header. Currently, the search bar
                        allows searching by post title or tag. 
                    </p>
                </div>
                <div className="help-section">
                    <p className="help-section-header">Profile</p>
                    <p className="help-section-body">
                        Once logged in, you can view your profile via the PROFILE link in the drop down menu located under your name 
                        in the header. 
                    </p>
                    <p className="help-section-body">
                        Your profile contains posts that you have generated in the past and are sorted 
                        into two categories, top rated and new.
                    </p>    
                    <p className="help-section-body">
                         Clicking on a post that you have generated will take you to the post's page, where 
                         you have the option to delete the post. This delete option can be found in the post's title 
                         section. 
                    </p>
                    <p className="help-section-body">
                         Your profile also contains a list of posts you have liked previously, allowing you to view
                         them by clicking on the post's title. 
                    </p>
                </div>
                <div className="help-section">
                    <p className="help-section-header">How Blog Posts are Generated</p>
                    <p className="help-section-body">
                        We utilize the power of OpenAI's GPT 3.5 Turbo model to generate blog posts based 
                        off of the context provided by you, as well as additional information we provide. 
                    </p>
                </div>
                <a className="back-home-link" onClick={() => props.setPage("home")}>Back Home</a>
            </div>
        </div>
    )
}