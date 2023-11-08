import React from 'react'
import Header from './components/Header';
import AddUserForm from './components/AddUserForm';
import AddPostForm from './components/AddPostForm';
import PostCardContainer from './components/PostCardContainer';
import Post from './components/Post';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SearchPosts from './components/SearchPosts';
import Profile from './components/Profile';
import './App.css'
import './assets/styles/post.css';
import PostCard from './components/PostCard';

function App() {

  const [currentPost, setCurrentPost] = React.useState({});
  const [page, setPage] = React.useState("home");
  const [currentUser, setCurrentUser] = React.useState(null)
  const [getRes, setGetRes] = React.useState(null);
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [modalBackground, setModalBackground] = React.useState(false);

  React.useEffect(() => {
    setOpenDropdown(false);
  }, [page])

  return (
    <div className='App' onClick={() => setOpenDropdown(false)}>
      {(modalBackground && page === "addPost") &&
        <div className="modal-background">
          <div className="modal-loading">
            <p className="loading-text">Generating...</p>
            <div className="loader-animation">
            </div>
          </div>
        </div>
      }
      {(modalBackground && page === "post") &&
        <div className="modal-background">
          <div className="modal-login">
            <p className="loading-text">Please Login to interact with posts.</p>
            <button 
              onClick={() => {setModalBackground(false);
                              setPage("login");}}                
            >Login</button>
            <button
              onClick={() => {setModalBackground(false)}}
            >I'm Good</button>
            </div>
          </div>
      }
      {<Header
        setPage={setPage}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        setOpenDropdown={setOpenDropdown}
        openDropdown={openDropdown}
      />}
      <main>
        {page === "home" && 
          <PostCardContainer 
            setPage={setPage}
            setCurrentPost={setCurrentPost}
            header={"Recent Posts"}
        />}
        {page === "login" &&
          <Login 
            setPage={setPage}
            setCurrentUser={setCurrentUser}
          />
        }
        {page === "post" && 
          <Post 
            currentUser={currentUser}
            currentPost={currentPost}
            setModalBackground={setModalBackground}
            setPage={setPage}
          />}
        {page === "addPost" &&
          <AddPostForm
            currentUser={currentUser}
            setPage={setPage}
            setCurrentPost={setCurrentPost}
            setModalBackground={setModalBackground}
            modalBackground={modalBackground}
          />
        }
        {page === "signup" &&
          <SignUp 
            setPage={setPage}
          />
        }
        {
          page === "search" &&
          <SearchPosts 
          
          />
        }
        {
          page === "profile" &&
          <Profile 
            currentUser={currentUser}
            setPage={setPage}
            setCurrentPost={setCurrentPost}
          />
        }
      </main>
    </div>
  )
}

export default App
