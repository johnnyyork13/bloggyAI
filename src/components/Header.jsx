import react from 'react-dom';

export default function Header(props) {

    return (
        <header>
            <p onClick={() => props.setPage("home")}>Bloggy</p>
            <nav className="link-container">
                <a onClick={() => props.setPage("addPost")}>Add Post</a>
                <a onClick={() => props.setPage("login")}>Login</a>
                <a onClick={() => props.setPage("sign-up")}>Sign Up</a>
            </nav>
        </header>
    )
}