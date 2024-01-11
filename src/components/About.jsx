import React from 'react';

export default function About(props) {

    return(
        <div className="about-container">
            <div className="about">
                <p className="about-header-main">About BloggyAI</p>
                <p className="about-section-body">
                    BloggyAI is an AI powered blog generating application. We use the power of OpenAI's GPT 3.5 Turbo 
                    model coupled with context provided by user's to generate realistic blog posts about 
                    any topic. 
                </p>
                <p className="about-section-body">
                    This application was made as an interesting way to practice full stack web development. 
                    As such, BloggyAI is intended to be used strictly for entertainment purposes. All content created 
                    on this application is meant to be created in good fun, and should be treated as such. 
                </p>
                <p className="about-section-body">
                    Thanks for using my application, I hope you get as much of a kick out of it as I did
                    making it. If you have any suggestions or just want to shoot me an email, you can reach me 
                    at me@johnnyyork.dev. Thanks!
                </p>
                <a className="back-home-link" onClick={() => props.setPage("home")}>Back Home</a>
            </div>
        </div>
    )
}