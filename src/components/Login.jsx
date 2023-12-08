import React from 'react';

export default function Login(props) {

    const [user, setUser] = React.useState({
      username: "",
      password: "",
    })
    const [loginError, setLoginError] = React.useState(false)
    const [loginFormError, setLoginFormError] = React.useState({
      username: false,
      password: false,
    })
    const [loginUser, setLoginUser] = React.useState(false);

    function handleInputChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    React.useEffect(() => {
      try {
        if (loginUser) {
          async function handleLogin() {
            const url = props.root + "/user/login";
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
                  setLoginUser(false);
                }
              } else {
                setLoginError(true)
              }
            });
          }
          handleLogin();
        }
      } catch(err) {
        console.log(err);
      }
    }, [loginUser]);

    function handleLogin() {
      let allFieldsHaveValues = true;
      for (const key in user) {
        if (user[key] === "") {
          setLoginError(false);
          allFieldsHaveValues = false;
          setLoginFormError((prev) => ({
            ...prev,
            [key]: true
          }))
        } else {
          setLoginFormError((prev) => ({
            ...prev,
            [key]: false
          }))
        }
      }
      if (allFieldsHaveValues) {
        setLoginUser(true); 
      }
    }

    
    return (
        <section className="login-container">
            <p className="login-container-header">Login (v5)</p>
            <form className='login-container-form'>
              <label className="login-container-label" htmlFor="username"> {(!loginError && loginFormError.username) && 'Please Enter a Username'}{loginError && 'Username or Password Incorrect'}
                <input className="login-input" onChange={handleInputChange} type="text" name="username" placeholder="Username" suggested="current-login"/>
              </label>
              <label className="login-container-label" htmlFor="password"> {(loginFormError.password) && "Please Enter a Password"}
                <input className="login-input" onChange={handleInputChange} type="password" name="password" placeholder="Password" suggested="current-password" autoComplete='on'/>
              </label>
              <button className="login-btn post-page-btn" type="button" onClick={handleLogin}>Submit</button>
              <p className="new-user-header">New User? <span onClick={() => props.setPage("signup")} className="create-blog-btn">Create a New Blog</span></p>
            </form>
        </section>
    )
}