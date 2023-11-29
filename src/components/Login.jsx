import React from 'react';

export default function Login(props) {

    const [user, setUser] = React.useState()
    const [loginError, setLoginError] = React.useState(false)

    function handleInputChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    async function handleLogin(e) {
        const url = props.root + "/user/login";
        console.log(url);
        e.preventDefault();
        try {
          await fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type":"application/json",
            },
            body: JSON.stringify(user)
          }).then((res) => res.json())
          .then((res) => {
            if (res) {
              if (!res.message) {
                props.setPage("home")
                props.setCurrentUser(res);
              } else {
                setLoginError(true);
              }
            } else {
              setLoginError(true)
            }
          });
        } catch(err) {
          console.log(err);
        }
      }

    return (
        <section className="login-container">
            <p className="login-container-header">Login</p>
            <form>
                <input className="login-input" onChange={handleInputChange} type="text" name="username" placeholder="Username" suggested="current-login"/>
                <input className="login-input" onChange={handleInputChange} type="password" name="password" placeholder="Password" suggested="current-password"/>
                <button className="login-btn post-page-btn" type="button" onClick={handleLogin}>Submit</button>
                <p className="new-user-header">New User? <span onClick={() => props.setPage("signup")} className="create-blog-btn">Create a New Blog</span></p>
            </form>
            <section className="login-error-container">
                {loginError && <p>Username or password incorrect.</p>}
            </section>
        </section>
    )
}