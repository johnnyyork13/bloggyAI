import React from 'react';

export default function AddUserForm(props) {

    const [user, setUser] = React.useState({
        username: "",
        password: "",
        membership: "user",
    })

    // function handleSetUser(e) {
    //     setUser((prev) => ({
    //         ...prev,
    //         [e.target.name] : e.target.value
    //     }))
    // }

    // async function handleSubmitForm(e) {
    //     e.preventDefault();
    //     const url = "http://localhost:3000/blog/user/add/test";
    //     try {
    //         await fetch(url, {
    //             method: "POST",
    //             mode: 'cors',
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(user)
    //         }).then((res) => console.log(res));
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    return (
        <section className="add-user-form-container">
            <input onChange={handleSetUser} type="text" name="username" placeholder="Username" />
            <input onChange={handleSetUser} type="text" name="password" placeholder="Password" />
            <button type="submit" onClick={handleSubmitForm}>Add Post</button>
        </section>
    )
}