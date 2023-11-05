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
        const url = "http://localhost:3000/blog/user/login";
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
            if (res.success) {
              //setPage("home")
              console.log("LOGIN SUCCESS");
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
            <form>
                <input onChange={handleInputChange} type="text" name="username" placeholder="Username" />
                <input onChange={handleInputChange} type="password" name="password" placeholder="Password" />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
            <section className="login-error-container">
                {loginError && <p>Username or password incorrect.</p>}
            </section>
        </section>
    )
}