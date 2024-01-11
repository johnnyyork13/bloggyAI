import React from 'react';
import Modal from './Modal';

export default function SignUp(props) {

    const [user, setUser] = React.useState({
        username: "",
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [formError, setFormError] = React.useState({
        username: false,
        displayName: false,
        email: false,
        password: false,
        confirmPassword: false,
    })
    const [saveUser, setSaveUser] = React.useState(false);
    const [signUpError, setSignUpError] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    function handleInputChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    React.useEffect(() => {
        if (saveUser) {
            async function postUser() {
                const url = props.root + "/user/add";
                try {
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            username: user.username,
                            displayName: user.displayName,
                            email: user.email,
                            password: user.password
                        })
                    }).then((res) => res.json())
                    .then((data) => {
                        if (data.success) {
                            setShowModal(true);
                        } else {

                        }
                    })
                    .catch((err) => console.log(err));
                } catch(err) {
                    console.log(err);
                }
            }
            postUser();
        }
    }, [saveUser])

    function handleUserSignup() {
        let allFieldsHaveValues = true;
        for (const key in user) {
            if (user[key] === "") {
                setFormError((prev) => ({
                    ...prev,
                    [key]: true,
                }))
                allFieldsHaveValues = false;
            } else {
                setFormError((prev) => ({
                    ...prev,
                    [key]: false
                }))
            }
        }
        if (allFieldsHaveValues) setSaveUser(true);
    }

    return (
        <section className="login-container">
            {showModal && <Modal
                text="Please Login With Your Username and Password." 
                setPage={props.setPage}
                setShowModal={setShowModal}
                goToPage="home"
            />}
            <p className="login-container-header">Create New Account</p>
            <div className='login-container-form'>
                <label className="login-container-label" htmlFor="username"> {(!signUpError && formError.username) && 'Please Enter a Username'}{signUpError && 'Username is Already Taken'}
                    <input className="login-input" onChange={handleInputChange} type="text" name="username" placeholder="Username*"/>
                </label>
                <label className="login-container-label" htmlFor="displayName"> {formError.displayName && "Please enter a Display Name"}
                    <input className="login-input" onChange={handleInputChange} type="text" name="displayName" placeholder='Display Name*'/>
                </label>
                <label className="login-container-label" htmlFor="email"> {formError.email && "Please Enter a Valid Email"}
                    <input className="login-input" onChange={handleInputChange} type="email" name="email" placeholder='Email*'/>
                </label>
                <label className="login-container-label" htmlFor="password"> {formError.password && 'Please Enter a Valid Password'}
                    <input className="login-input" onChange={handleInputChange} type="password" name="password" placeholder='Password*'/>
                </label>
                <label className="login-container-label" htmlFor="confirmPassword"> {formError.confirmPassword && 'Passwords Do Not Match'}
                    <input className="login-input" onChange={handleInputChange} type="password" name="confirmPassword" placeholder="Confirm Password*"/>
                </label>
                <button className="login-btn post-page-btn" onClick={handleUserSignup}>Sign Up</button>
            </div>
        </section>
    )
}