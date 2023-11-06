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

  const [post, setPost] = React.useState({});
  const [page, setPage] = React.useState("home");
  const [currentUser, setCurrentUser] = React.useState(null)
  

  async function handleFormSubmit(e, data, url) {
    setPage("home");
    e.preventDefault();
    try {
      await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='App'>
      <Header
        setPage={setPage}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
      />
      <main>
        {page === "home" && 
          <PostCardContainer 
            setPage={setPage}
            setPost={setPost}
            header={"Recent Posts"}
        />}
        {page === "post" && 
          <Post 
            user={currentUser}
            post={post}
            setPage={setPage}
          />}
        {page === "addPost" &&
          <AddPostForm
            user={currentUser}
            handleFormSubmit={handleFormSubmit}
          />
        }
        {page === "login" &&
          <Login 
            setPage={setPage}
            setCurrentUser={setCurrentUser}
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
