import React from 'react';
import SearchBar from './SearchBar';
import Modal from './Modal';

export default function Header(props) {

    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
        if (showModal) {
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
            handleLogout();
        }
    }, [showModal])


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
            {showModal && <Modal 
                text="You Have Successfully Logged Out."
                setPage={props.setPage}
                setShowModal={setShowModal}
                goToPage="home"
            />} 
            <p onClick={() => props.setPage("home")}>BloggyAI</p>
            <SearchBar 
                root={props.root}
                setPage={props.setPage}
                setCurrentPost={props.setCurrentPost}
            />
            <nav className="link-container">
                {props.currentUser && <a className="add-post-link" onClick={() => props.setPage("addPost")}>
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
                            <a onClick={() => props.setPage("addPost")}>Add Post</a>  
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
                            <a onClick={() => props.setPage("browse")}>Browse</a>                            
                            <a onClick={() => props.setPage("help")}>Help</a>
                            <a onClick={() => props.setPage("about")}>About Bloggy</a>
                            <a onClick={() => {
                                setShowModal(true);
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