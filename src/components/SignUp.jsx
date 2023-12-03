import React from 'react';

export default function SignUp(props) {

    const [user, setUser] = React.useState({
        username: "",
        displayName: "",
        email: "",
        password: "",

    })

    function handleInputChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    async function handleSignUp(e) {
        const url = props.root + "/user/add";
        try {
            await fetch(url, {
                method: "POST",
                mode: "cors",
                credentials: 'include',
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    displayName: user.displayName,
                    email: user.email,
                    password: user.password
                })
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section className="login-container">
            <p className="login-container-header">Create New Blog</p>
            <form>
                <input className="login-input" onChange={handleInputChange} type="text" name="username" placeholder="Username" required/>
                <input className="login-input" onChange={handleInputChange} type="text" name="displayName" placeholder='Display Name' />
                <input className="login-input" onChange={handleInputChange} type="email" name="email" placeholder='Email' />
                <input className="login-input" onChange={handleInputChange} type="password" name="password" placeholder='Password' />
                <input className="login-input" onChange={handleInputChange} type="password" name="confirmPassword" placeholder="Confirm Password" />
                <button className="login-btn post-page-btn" type="submit" onClick={handleSignUp}>Sign Up</button>
            </form>
        </section>
    )
}