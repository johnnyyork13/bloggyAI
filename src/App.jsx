import React from 'react'
import Header from './components/Header';
import AddUserForm from './components/AddUserForm';
import AddPostForm from './components/AddPostForm';
import PostCardContainer from './components/PostCardContainer';
import Post from './components/Post';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css'
import './assets/styles/post.css';
import PostCard from './components/PostCard';

function App() {

  const [currentPost, setCurrentPost] = React.useState({});
  const [page, setPage] = React.useState("home");
  const [currentUser, setCurrentUser] = React.useState(null)
  const [getRes, setGetRes] = React.useState(null);

  async function handleAddPostFormSubmit(e, data, url) {
    console.log(data);
    e.preventDefault();
    try {
      await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then((res) => res.json())
      .then((data) => setGetRes(data))
      .then(() => setPage("home"));
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='App'>
      {<Header
        setPage={setPage}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
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
            setPage={setPage}
          />}
        {page === "addPost" &&
          <AddPostForm
            currentUser={currentUser}
            handleAddPostFormSubmit={handleAddPostFormSubmit}
          />
        }
        {page === "signup" &&
          <SignUp 
            setPage={setPage}
          />
        }
      </main>

      {/* <AddUserForm /> */}

    </div>
  )
}

export default App
