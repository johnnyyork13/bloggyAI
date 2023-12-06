import react from 'react-dom';
import SearchPosts from './SearchPosts';

export default function Header(props) {

    async function handleLogout() {
        try {
            const url = props.root + "/user/logout";
            await fetch(url, {
                credentials: 'include',
            })
            .then((res) => res.json())
            .then((res) => console.log(res));
        } catch(err) {
            console.log(err);
        }
    }

    function handleOpenDropdown(e){
        if (props.openDropdown) {
            props.setOpenDropdown(false);
        } else {
            e.stopPropagation();
            props.setOpenDropdown(true);
        }
    }

    return (
        <header>
            <p onClick={() => props.setPage("home")}>BloggyAI</p>
            <SearchPosts 
                root={props.root}
                setPage={props.setPage}
                setCurrentPost={props.setCurrentPost}
            />
            <nav className="link-container">
                {props.currentUser && <a onClick={() => props.setPage("addPost")}>
                    <span className="plus-symbol">{String.fromCharCode(43)}</span> Add Post
                </a>}
                {/* {props.currentUser && 
                    <a onClick={() => {
                        props.setPage("home"); 
                        handleLogout();
                        props.setCurrentUser(null)}}
                    >Logout</a>} */}
                {props.currentUser &&
                    <div className="header-dropdown-menu" onClick={handleOpenDropdown}>
                        {props.currentUser.displayName}<span className="dropdown-arrow"></span>
                        <div className={`header-dropdown ${props.openDropdown ? "open-dropdown" : "close-dropdown"}`}>
                            <a onClick={
                                () => {props.setPage("profile")
                                       props.setCurrentUser((prev) => {
                                        return {
                                            ...prev,
                                            visiting: prev.username
                                        }
                                       })
                                }
                            }>My Posts</a>
                            <a onClick={() => {
                                props.setPage("home");
                                handleLogout();
                                props.setCurrentUser(null)
                            }}>Logout</a>
                        </div>
                    </div>
                }
                {!props.currentUser && <a onClick={() => props.setPage("login")}>Login</a>}
                {/* {!props.currentUser && <a onClick={() => props.setPage("signup")}>Create an Account</a>} */}
                
            </nav>
        </header>
    )
}