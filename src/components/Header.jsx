import react from 'react-dom';

export default function Header(props) {

    async function handleLogout() {
        try {
            const url = "http://localhost:3000/blog/user/logout";
            await fetch(url)
            .then((res) => res.json())
            .then((res) => console.log(res));
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <header>
            <p onClick={() => props.setPage("home")}>Bloggy</p>
            <nav className="link-container">
                {props.currentUser && <a onClick={() => props.setPage("addPost")}>Add Post</a>}
                {props.currentUser && 
                    <a onClick={() => {
                        props.setPage("home"); 
                        handleLogout();
                        props.setCurrentUser(null)}}
                    >Logout</a>}
                {!props.currentUser && <a onClick={() => props.setPage("login")}>Sign In</a>}
                {/* {!props.currentUser && <a onClick={() => props.setPage("signup")}>Create an Account</a>} */}
                
            </nav>
        </header>
    )
}