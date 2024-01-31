import React from 'react'
import './App.css'
import './assets/styles/post.css';
import './queries.css';
import Header from './components/Header';
import AddUserForm from './components/AddUserForm';
import AddPostForm from './components/AddPostForm';
import PostCardContainer from './components/PostCardContainer';
import Post from './components/Post';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Browse from './components/Browse';
import PostCard from './components/PostCard';
import Help from './components/Help';
import About from './components/About';

function App() {

  const [currentPost, setCurrentPost] = React.useState({});
  const [page, setPage] = React.useState("home");
  const [currentUser, setCurrentUser] = React.useState(null)
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [modalBackground, setModalBackground] = React.useState(true);
  const [browseKey, setBrowseKey] = React.useState({
    tag: null,
    user: null,
    genre: null,
    new: null,
    top: null,
  });

  const root = 'https://us-central1-api-backend-28a77.cloudfunctions.net/api';
  // const root = "http://localhost:3000";

  React.useEffect(() => {
    setOpenDropdown(false);
    if (page !== 'browse') {
      setBrowseKey({
        tag: null,
        user: null,
        genre: null,
        new: null,
        top: null
      })
    }
  }, [page])

  React.useEffect(() => {
    async function checkIfAlreadyLoggedIn() {
      await fetch(root, {
        mode: "cors",
        credentials: "include",
      })
      .then((res) => res.json())
      .then((res) => {
        if (!res.message) {
          setCurrentUser(res);
        }
      }).catch((err) => {
        console.log(err);
      });
                      
    }
    checkIfAlreadyLoggedIn();
  }, [])

  return (
    <div className='App' onClick={() => setOpenDropdown(false)}>
      {(modalBackground && page === "addPost") &&
        <div className="prompt-modal-background">
          <div className="prompt-modal-loading">
            <p className="prompt-loading-text">Generating...</p>
            <div className="prompt-loader-animation">
            </div>
          </div>
        </div>
      }
      {(modalBackground && page === "home") &&
        <div className="prompt-modal-background">
          <div className="prompt-modal-loading">
            <p className="prompt-loading-text">Getting Posts...</p>
            <div className="prompt-loader-animation">
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
        root={root}
        setPage={setPage}
        setCurrentPost={setCurrentPost}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        setOpenDropdown={setOpenDropdown}
        openDropdown={openDropdown}
      />}
      <main>
        {page === "home" && 
          <PostCardContainer 
            root={root}
            setPage={setPage}
            page={page}
            setCurrentPost={setCurrentPost}
            setBrowseKey={setBrowseKey}
            setModalBackground={setModalBackground}
        />}
        {page === "login" &&
          <Login 
            root={root}
            setPage={setPage}
            setCurrentUser={setCurrentUser}
          />
        }
        {page === "post" && 
          <Post 
            root={root}
            currentUser={currentUser}
            currentPost={currentPost}
            setCurrentUser={setCurrentUser}
            setModalBackground={setModalBackground}
            setPage={setPage}
            setBrowseKey={setBrowseKey}
          />}
        {page === "addPost" &&
          <AddPostForm
            root={root}
            currentUser={currentUser}
            setPage={setPage}
            setCurrentPost={setCurrentPost}
            setModalBackground={setModalBackground}
            modalBackground={modalBackground}
          />
        }
        {page === "signup" &&
          <SignUp 
            root={root}
            setPage={setPage}
          />
        }
        {
          page === "profile" &&
          <Profile 
            root={root}
            currentUser={currentUser}
            setPage={setPage}
            page={page}
            setCurrentPost={setCurrentPost}
          />
        }
        {
          page === "browse" &&
          <Browse 
            root={root}
            browseKey={browseKey}
            setBrowseKey={setBrowseKey}
            setPage={setPage}
            page={page}
            setCurrentPost={setCurrentPost}
          />
        }

        {page === "help" && 
          <Help 
            setPage={setPage}
          />
        }

        {page === "about" && 
          <About 
            setPage={setPage}
          />
        }
      </main>
    </div>
  )
}

export default App
