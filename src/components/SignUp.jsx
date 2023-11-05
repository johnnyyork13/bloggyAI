import React from 'react';

export default function SignUp(props) {

    const [user, setUser] = React.useState({
        username: "",
        password: ""
    })

    function handleInputChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    async function handleSignUp(e) {
        const url = "http://localhost:3000/blog/user/add";
        try {
            await fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(user)
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section className="signup-container">
            <form>
                <input onChange={handleInputChange} type="text" name="username" placeholder="Username" />
                <input onChange={handleInputChange} type="password" name="password" placeholder="Password" />
                <button type="button" onClick={handleSignUp}>Sign Up</button>
            </form>
        </section>
    )
}